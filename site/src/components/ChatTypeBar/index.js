import React, { Component } from 'react';
import '../home.scss';
import { auth } from '../../auth';
import getApiConfig from '../../apiConfig';
import * as socketUtils from '../../utils/socketUtils';

class ChatTypeBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: ''
        }
        this.config = getApiConfig();
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.user.username !== nextProps.user.username)
            this.setState({message: ''});
    }

    sendMessage(e){
        e.preventDefault();
        var mssg = this.state.message.trim();
        this.setState({message: ''});
        var payload = {user_from: auth.userid, user_to: this.props.user._id, content: mssg, time: Date.now().toString()};
        socketUtils.sendMessage(payload);
    }

    render(){
        return (
            <div className='type_msg'>
                <div className='input_msg_write'>
                    <form onSubmit = {this.sendMessage}>
                        <textarea
                            autoFocus
                            type='text'
                            className='write_msg'
                            placeholder='Type a message'
                            onChange = {(e) => this.setState({message: e.target.value})}
                            value = {this.state.message}
                        />
                        <button
                            className='msg_send_btn'
                            type='submit'
                        >
                            <i className='fa fa-paper-plane-o' aria-hidden='true'>
                            </i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ChatTypeBar;
