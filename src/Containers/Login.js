import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card , Input , Button , Row , Col , Form , Layout  } from 'antd';

const { Header , Content , Footer } = Layout;

class Login extends React.Component{


    //handle login submit
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }


    //render the heading of the page
    renderHeading = () => {
        return(
            <Card className="heading">ChatApp</Card>
        )
    }

    //render the greeting message
    renderGreeting = () => {
        let d = new Date();
        let time = d.getHours();
        let greeting = ''
        if(time>=0 && time<12){
            greeting = 'Morning';
        }
        else if(time>=12 &&  time<17)
        {
            greeting = 'Afternoon'
        }
        else
        {
            greeting = 'Evening'
        }
        return(
            <Card bordered={false} className="greeting">Good {greeting} !</Card>
        )
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
                            <Input type="email" placeholder="UserEmail" />
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input type="password" placeholder="Password" />
                        )}
                        </Form.Item>
                        <Form.Item>
                        <Button className="login-btn" type="primary" htmlType="submit">
                            Log in
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
                    {this.renderHeading()}
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {this.renderGreeting()}
                </Col>
            </Row>
            <Row>
                <Col offset={8} span={8}>
                    {this.renderForm()}
                </Col>
            </Row>
        </div>)
    }
}
export default Form.create()(Login);