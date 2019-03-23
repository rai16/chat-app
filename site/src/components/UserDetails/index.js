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
                        <h5>{this.props.user.username} (last seen at ){this.props.user.lastSeen} <span className='chat_date'>Dec 25</span></h5>
                        <p>Test, which is a new approach to have all solutions
                        astrology under one roof.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDetails;