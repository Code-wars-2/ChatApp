import React from 'react';
import { NavLink , Redirect } from 'react-router-dom';
import { Row , Col , Input , Button } from 'antd';
import * as Component from '../Components/index';
import firebase from '../Config/firebase'


class Chatscreen extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loading:false,
            authenticated:true,
            currentUser:null
        }
    }
    componentDidMount(){
        this.setState({
            loading:true
        })
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                let name = user.email.split('@');
                let dname = name[0];
                name = dname.replace(dname[0],dname[0].toUpperCase())
                this.setState({
                    authenticated:true,
                    loading:false,
                    currentUser:name
                })
            }
            else{
                this.setState({
                    authenticated:false,
                    loading:false,
                })
            }
        })
    }

    logout = () =>{
        firebase.auth().signOut()
    }

    render(){
        if(!this.state.authenticated){
            return <Redirect to="/login"/>
        }
        if(this.state.loading){
            return <Component.Loader/>
        }
        else{
            return(<div>
                <NavLink to="/chatscreen"/>
                <Row>
                    <Col span={24}>
                        <Component.Heading user={this.state.currentUser}/>
                    </Col>
                </Row>
                <div><button onClick={()=>this.logout()}>Test Logout</button></div>
                <Row>
                    <Col offset={1} span={21}><Input placeholder="Type message here" type="text"/></Col>
                    <Col span={1}><Button type="primary">Send</Button></Col>
                </Row>
                </div>)
        }
        
    }
}
export default Chatscreen;