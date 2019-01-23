import React from 'react';
import { NavLink , Redirect } from 'react-router-dom';
import { Row , Col , Input , Button , Card , Icon } from 'antd';
import * as Component from '../Components/index';
import firebase from '../Config/firebase';
import _ from 'lodash';
import ScrollToBottom from 'react-scroll-to-bottom';




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



    handleKeyPress = (event) => {
        if (event.keyCode == 13 || event.which == 13){
            return this.sendMessage()      
        }
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
        let date = null;
        let hours = null;
        let minutes = null; 
        let textmessage = [];
        let split = [];
        let messagesVal = values;
        let messages = _(messagesVal)
                          .keys()
                          .map(messageKey => {
                              let cloned = _.clone(messagesVal[messageKey]);
                              cloned.key = messageKey;
                              return cloned;
                          })
                          .value();
        for(var index in messages){
            split = messages[index].message.split('/');
            date = new Date(split[2]*1000);
            hours = date.getHours();
            minutes = date.getMinutes();
            if(hours < 10){
                hours='0'+hours
            }
            if(minutes < 10){
                minutes='0'+minutes
            }
            textmessage.push({
                message:split[0],
                user:split[1],
                hrs:hours,
                min:minutes,
                key:index
            })
        }
        this.setState({
            messages: textmessage
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
            return(<div className="body">
                <NavLink to="/chatscreen"/>
                <Row>
                    <Col span={24}>
                        <Component.Heading user={this.state.currentUser}/>
                    </Col>
                </Row>
                <div><button onClick={()=>this.logout()}>Test Logout</button></div>
                <ScrollToBottom className="messages" animating={true}>
                    {this.state.messages.map((message,key) => {
                        if(message.user!==this.state.currentUser){
                                return  <div key={key} className="message-from">
                                    <div className="name">{message.user[0]}</div><div className="texts">{message.message} <span className="time">{message.hrs}:{message.min}<Icon className="tick1" type="check" /><Icon className="tick2" type="check" /></span></div>
                                </div>
                        }
                        else{
                                return  <div key={key} className="message-own">
                                    <div className="name">{message.user[0]}</div><div className="texts">{message.message} <span className="time">{message.hrs}:{message.min}<Icon className="tick1" type="check" /><Icon className="tick2" type="check" /></span></div>
                                </div>
                        }
                    }
                )}
                </ScrollToBottom>
                <div className="wrapper"> 
                        <Input placeholder="Type message here" className="input-flex-item" id="inputtext" onChange={this.handleChange} onKeyPress={this.handleKeyPress} name='input' value={this.state.input}/>
                        <Button type="primary" className="btn-flex-item" onClick={()=>this.sendMessage()} >Send</Button>
                </div>
            </div>
            )
        }
        
    }
}
export default Chatscreen;