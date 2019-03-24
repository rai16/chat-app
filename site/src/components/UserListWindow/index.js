import React, { Component } from 'react';
import '../home.scss';
import UserDetails from '../UserDetails';
import UserSearch from '../UserSearch';

class UserListWindow extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedUser: null,
            selectedKey: -1
        }
        this.changeSelectedUser = this.changeSelectedUser.bind(this);
    }
    
    changeSelectedUser(key, user){
        if(this.state.selectedKey!==key){
            this.setState({selectedUser: user, selectedKey: key});
            this.props.onSelectedUserChange(user);
        }
    }

    render(){
    
        return(
            <div className='inbox_people'>
                <UserSearch/>
                <div className='inbox_chat'>
                    {this.props.users.map((user, key) => {
                        return <div key = {key} onClick = {() => this.changeSelectedUser(key, user)}> 
                            <UserDetails key = {key} isActive = {this.state.selectedKey === key} user = {user}/>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default UserListWindow;