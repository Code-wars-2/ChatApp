import React from 'react';
import { NavLink , Redirect } from 'react-router-dom';
import { Row , Col , Input , Button , Card } from 'antd';
import * as Component from '../Components/index';
import firebase from '../Config/firebase';
import _ from 'lodash';

class Chatscreen extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loading:false,
            authenticated:true,
            currentUser:null,
            input:'',
            messages:[]
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
        this.showMessages();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    sendMessage = () => {
        var unix = Math.round(+new Date()/1000);
        firebase.database().ref('/messages').push
        ({
            message:this.state.input+"/"+this.state.currentUser+"/"+unix
        });
        this.setState({
            input:''
        })
    }

    showMessages = () => {
        let app = firebase.database().ref('messages');
            app.on('value', snapshot => {
              this.getData(snapshot.val());
            });
    }
        getData = (values) => {
        let messagesVal = values;
        let messages = _(messagesVal)
                          .keys()
                          .map(messageKey => {
                              let cloned = _.clone(messagesVal[messageKey]);
                              cloned.key = messageKey;
                              return cloned;
                          })
                          .value();
          this.setState({
            messages: messages
          });
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
                <div className="messages">{this.state.messages.map((message) => {
                    return <div className="message-mine">{message.message}</div>
                })}</div>
                <Card className="input-bar">
                    <div className="wrapper"> 
                        <Input placeholder="Type message here" className="input-flex-item" onChange={this.handleChange} name='input' value={this.state.input}/>
                        <Button type="primary" className="btn-flex-item" onClick={()=>this.sendMessage()}>Send</Button>
                    </div>
                </Card>
                
                </div>
                )
        }
        
    }
}
export default Chatscreen;