import React, { Component } from 'react';
import '../home.scss';
import ChatTypeBar from '../ChatTypeBar';
import IncomingMessage from '../IncomingMessage';
import OutgoingMessage from '../OutgoingMessage';

class ChatWindow extends Component{
    render(){
        return(
            <div className='mesgs'>
                <div className='msg_history'>
                    <IncomingMessage/>
                    <OutgoingMessage/>
                    <OutgoingMessage/>
                    <OutgoingMessage/>
                    <OutgoingMessage/>
                    <OutgoingMessage/>
                    <IncomingMessage/>
                    <IncomingMessage/>
                    <OutgoingMessage/>
                    <OutgoingMessage/>
                    <IncomingMessage/>
                </div>
                <ChatTypeBar/>
            </div>
        );
    }
}

export default ChatWindow;