import React, { Component } from 'react';
import '../home.scss';

class OutgoingMessage extends Component {
    render(){
        return (
            <div className='outgoing_msg'>
                <div className='sent_msg'>
                <p>{this.props.message.content}</p>
                <span className='time_date'> 11:01 AM    |    June 9</span> </div>
            </div>
        );
    }
}

export default OutgoingMessage;