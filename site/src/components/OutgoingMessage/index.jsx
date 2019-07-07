import React, { Component } from 'react';
import '../home.scss';
import { parseDate } from '../../utils/dateUtils';

class OutgoingMessage extends Component {
    render(){
        return (
            <div className='outgoing_msg'>
                <div className='sent_msg'>
                <p>{this.props.message.content}</p>
                <span className='time_date'> {parseDate(this.props.message.time)} </span> </div>
            </div>
        );
    }
}

export default OutgoingMessage;