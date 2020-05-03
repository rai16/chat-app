import React, { Component } from 'react';
import '../home.scss';
var classNames = require('classnames');

class UserDetails extends Component {
    render(){
        return (
            <div className={classNames('chat_list', {active_chat: this.props.isActive})}>
                <div className='chat_people'>
                    <div className='chat_img'> <img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'/> </div>
                    <div className='chat_ib'>
                        <h5>{this.props.user.username} <span className='chat_date'>Dec 25</span></h5>
                        {this.props.user.lastMessage && <p>{this.props.user.lastMessage.content}</p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDetails;
