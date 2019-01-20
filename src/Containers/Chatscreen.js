import React from 'react';
import { NavLink , Redirect } from 'react-router-dom';
import { Row , Col } from 'antd';
import * as Component from '../Components/index';
import firebase from '../Config/firebase'


class Chatscreen extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loading:false,
            authenticated:true
        }
    }
    componentDidMount(){
        this.setState({
            loading:true
        })
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({
                    authenticated:true,
                    loading:false
                })
            }
            else{
                this.setState({
                    authenticated:false,
                    loading:false
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
                        <Component.Heading user={this.state.user}/>
                    </Col>
                </Row>
                <div><button onClick={()=>this.logout()}>Logout</button></div>
                </div>)
        }
        
    }
}
export default Chatscreen;