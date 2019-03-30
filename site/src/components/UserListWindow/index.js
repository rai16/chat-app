import React, { Component } from 'react';
import '../home.scss';
import UserDetails from '../UserDetails';
import UserSearch from '../UserSearch';

class UserListWindow extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            selectedUser: {_id: -1},
            userFilter: props.users,
            userSearchText: ''
        }
        this.changeSelectedUser = this.changeSelectedUser.bind(this);
        this.changeUserSearchText = this.changeUserSearchText.bind(this);
    }
    
    
    changeUserSearchText(e){
        var text = e.target.value.trim();
        var finalUserList = this.props.users;
        if(text.length>0)
            finalUserList = finalUserList.filter((item) => item.username.includes(text));
        
        this.setState({userFilter: finalUserList});
        this.forceUpdate();
    }

    changeSelectedUser(key, user){
        if(this.state.selectedUser._id!==user._id){
            this.setState({selectedUser: user});
            this.props.onSelectedUserChange(user);
        }
    }

    render(){
        return(
            <div className='inbox_people'>
                <UserSearch onSearchTextChange = {this.changeUserSearchText}/>
                <div className='inbox_chat'>
                    {this.state.userFilter.map((user, key) => {
                        return <div key = {key} onClick = {() => this.changeSelectedUser(key, user)}> 
                            <UserDetails key = {key} isActive = {this.state.selectedUser._id === user._id} user = {user}/>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default UserListWindow;