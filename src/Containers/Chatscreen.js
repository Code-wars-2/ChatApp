import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card , Row , Col } from 'antd';
import * as Component from '../Components/index';


class Chatscreen extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            user:'Sooraj'
        }
    }
    render(){
        return(<div>
            <NavLink to="/chatscreen"/>
            <Row>
                <Col span={24}>
                    <Component.Heading user={this.state.user}/>
                </Col>
            </Row>
            </div>)
    }
}
export default Chatscreen;