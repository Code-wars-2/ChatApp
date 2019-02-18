import React from 'react';
import { NavLink , Redirect } from 'react-router-dom';
import { Row , Col , Input , Button , Card , Icon } from 'antd';
import * as Component from '../Components/index';
import firebase from '../Config/firebase';
import _ from 'lodash';
import ScrollToBottom from 'react-scroll-to-bottom';

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const HeartIcon = props => (
  <Icon component={HeartSvg} {...props} />
);


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
            return this.sendMessage('false')      
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    sendMessage = (heart) => {
        var unix = Math.round(+new Date()/1000);
        firebase.database().ref('/messages').push
        ({
            message:this.state.input+"/"+this.state.currentUser+"/"+unix+"/"+heart
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
                key:index,
                heart:split[3]
                })

            if(messages.length>20){
                textmessage.splice(0, textmessage.length - 20)
            }
            
        }
        this.setState({
            messages: textmessage
        });
      }

    logout = () =>{
        firebase.auth().signOut()
    }

    renderSync = (messages) => {
        if(messages.length){
            return (<div className="outer-message">
                    <ScrollToBottom className="messages" animating={true}>
                    {this.state.messages.map((message,key) => {
                        if(message.user!==this.state.currentUser){
                            if(message.heart==='true'){
                                return <div key={key} className="message-from">
                                    <div className="name"><div className="name-text">{message.user[0]}</div></div><HeartIcon style={{ color: '#ff60b2' , fontSize: '60px' }} />
                                </div>
                            }
                            else{
                                return  <div key={key} className="message-from">
                                    <div className="name"><div className="name-text">{message.user[0]}</div></div><div className="texts">{message.message} <span className="time">{message.hrs}:{message.min}<Icon className="tick1" type="check" /><Icon className="tick2" type="check" /></span></div>
                                </div>
                            }
                                
                        }
                        else{
                            if(message.heart==='true'){
                                return  <div key={key} className="message-own">
                                    <div className="name"><div className="name-text">{message.user[0]}</div></div><HeartIcon style={{ color: '#ff60b2' , fontSize: '60px' }} />
                                </div>
                            }
                            else{
                                return  <div key={key} className="message-own">
                                    <div className="name"><div className="name-text">{message.user[0]}</div></div><div className="texts">{message.message} <span className="time">{message.hrs}:{message.min}<Icon className="tick1" type="check" /><Icon className="tick2" type="check" /></span></div>
                                </div>
                            }
                            }
                        }
                    )}
                    </ScrollToBottom>
                </div>)
        }
        else{
            return <Icon className="sync" type="sync" />
        }
    }

    render(){
        if(!this.state.authenticated){
            return <Redirect to="/"/>
        }
            return(<div className="body">
                <NavLink to="/chatscreen"/>
                <div className="header">
                    <div className="heading">ChatApp</div>
                    <div><Button className="logout" onClick={()=>this.logout()}><div className="Fletter">{this.state.currentUser ? this.state.currentUser[0] : null}</div></Button></div>
                </div>
                <div>
                {this.renderSync(this.state.messages)}
                </div>
                <div className="wrapper"> 
                        <Input placeholder="Type message here" className="input-flex-item" id="inputtext" onChange={this.handleChange} onKeyPress={this.handleKeyPress} name='input' value={this.state.input}/>
                        <Button style={{ backgroundColor:'transparent' , border :'none' }} onClick={()=>this.sendMessage('true')}><HeartIcon style={{ color: '#ff60b2' , fontSize: '30px' }} /></Button>
                        <Button type="primary" className="btn-flex-item" onClick={()=>this.sendMessage('false')} >Send</Button>
                </div>
            </div>
            )
        
        
    }
}
export default Chatscreen;