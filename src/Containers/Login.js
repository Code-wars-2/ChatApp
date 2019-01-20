import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Component from '../Components/index';
import { Card , Input , Button , Row , Col , Form } from 'antd';
import { login } from '../Models/Models'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:'User'
        }
    }


    //handle login submit
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            login(values);
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
         
        return(
        <div>
            <NavLink to="/login"/>
            <Row>
                <Col span={24}>
                    <Component.Heading user={this.state.user}/>
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