import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import * as Component from '../Components/index';
import { Card , Input , Button , Row , Col , Form , message } from 'antd';
import firebase from '../Config/firebase';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:'User',
            authenticated:false
        }
    }

    //handle login submit
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            firebase.auth().signInWithEmailAndPassword(values.userEmail,values.password).then(response =>{
                this.setState({
                    authenticated:true
                })
            })
            .catch(error => {
                message.error(error.message)
            })
          }
        });
    }

    //render content about the App
    renderContent = () => {
        return(<Card>Content About App</Card>)
    }

    //render the login form
    renderForm = () => {
        const { getFieldDecorator } = this.props.form;       
        return(<Card className="login-card">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {getFieldDecorator('userEmail', {
                            rules: [{ required: true, message: 'Please input your userEmail!' }],
                        })(
                            <Input type="email" placeholder="UserEmail" className="form-item"/>
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input type="password" placeholder="Password" className="form-item"/>
                        )}
                        </Form.Item>
                        <Form.Item>
                        <Button className="login-btn form-item" type="primary" htmlType="submit">
                            Log In
                        </Button>
                        </Form.Item>
                    </Form>
                </Card>)
    }

    render(){
        if(this.state.authenticated){
            return <Redirect to='/chatscreen'/>
        }
         
        return(
        <div>
            <NavLink to="/login"/>
            <Row>
                <Col span={24}>
                    <Component.Heading/>
                </Col>
            </Row>
            <div className="flex-container">
                <div className="form">{this.renderForm()}</div> 
                <div className="content">{this.renderContent()}</div>     
            </div>
        </div>)
    }
}
export default Form.create()(Login);