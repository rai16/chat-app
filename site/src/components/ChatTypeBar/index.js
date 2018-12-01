import React, { Component } from 'react';
import '../home.scss';

class ChatTypeBar extends Component{
    render(){
        return (
            <div className='type_msg'>
                <div className='input_msg_write'>
                    <input type='text' className='write_msg' placeholder='Type a message' />
                    <button className='msg_send_btn' type='button'><i className='fa fa-paper-plane-o' aria-hidden='true'></i></button>
                </div>
            </div>
        );
    }
}

export default ChatTypeBar;