import React, { Component } from 'react';
import '../home.scss';
import UserDetails from '../UserDetails';
import UserSearch from '../UserSearch';

class UserListWindow extends Component {
    
    render(){
        console.log('inside user list window: ');
        console.log(this.props.users);
        return(
            <div className='inbox_people'>
                <UserSearch/>
                <div className='inbox_chat'>
                    {this.props.users.map((user, key) => {
                        return <UserDetails key = {key} isActive = {false} user = {user}/>
                    })}
                </div>
            </div>
        );
    }
}

export default UserListWindow;