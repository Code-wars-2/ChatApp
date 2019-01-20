import React from 'react';
import { Card } from 'antd';

class Heading extends React.Component {
    renderGreeting = (user) => {
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
            <span className="greeting">Good {greeting} {user}</span>
        )
    }
    render(){
        return(
            <Card className="heading">ChatApp {this.renderGreeting(this.props.user)}</Card>
            
        )
    }
}
export default Heading