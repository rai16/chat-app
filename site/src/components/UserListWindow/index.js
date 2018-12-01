import React, { Component } from 'react';
import '../home.scss';
import UserDetails from '../UserDetails';
import UserSearch from '../UserSearch';

class UserListWindow extends Component {
    render(){
        return(
            <div className='inbox_people'>
                <UserSearch/>
                <div className='inbox_chat'>
                    <UserDetails isActive = {true}/>
                    <UserDetails isActive = {false}/>
                    <UserDetails isActive = {false}/>
                    <UserDetails isActive = {true}/>
                </div>
            </div>
        );
    }
}

export default UserListWindow;