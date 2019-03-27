import React, { Component } from 'react';
import '../home.scss';
import ChatTypeBar from '../ChatTypeBar';
import IncomingMessage from '../IncomingMessage';
import OutgoingMessage from '../OutgoingMessage';

class ChatWindow extends Component{
    constructor(props){
        super(props);
        this.messagesEnd = React.createRef();
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }
    componentDidMount () {
        this.scrollToBottom();
      }
      componentDidUpdate () {
        this.scrollToBottom();
      }
      scrollToBottom = () => {
        this.messagesEnd.current.scrollIntoView();
      }
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
                    <div ref={this.messagesEnd} />
                </div> 
                <ChatTypeBar user = {this.props.user}/>
            </div>
            
        );
    }
}

export default ChatWindow;