import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../home.scss'; 
import Header from '../../Header';
import UserListWindow from '../../UserListWindow';
import ChatWindow from '../../ChatWindow';
import {auth} from '../../../auth';
import getApiConfig from '../../../apiConfig.js';
import * as homeActions from '../../../actions/homeActions';

class Home extends Component {
  
  constructor(props){
    super(props);
    this.config = getApiConfig();
    this.state = {
      selectedUser: null,
      messageThread: null
    }
    this.changeSelectedUser = this.changeSelectedUser.bind(this);
  }

  componentDidMount(){
    this.props.requestUserList();
    this.props.requestAllMessages();
    var userListApi = fetch(this.config.dev.users).then(res => res.json());
    var mssgListApi = fetch(this.config.dev.messages + '/'+auth.userid).then(res => res.json());
    Promise.all([userListApi, mssgListApi])
    .then((values) => {
      //remove yourself from the list of people you can chat with
      var users = values[0].users.filter((obj) => obj._id !== auth.userid);
      this.props.setUserList(users);
      this.props.setAllMessages(values[1].allMessages);
    },
    (error) => {
      alert('error in fetching users/messages');
    });
  }

  changeSelectedUser(user){
    this.setState({selectedUser: user});
  }


  render() {
    return (
      <div className='container-fluid'>
        <Header/>
        <div className='messaging row'>
          <div className='inbox_msg'>
                  {this.props.users && 
                  this.props.users.length > 0 && 
                  <UserListWindow users = {this.props.users} onSelectedUserChange = {this.changeSelectedUser}/>
                  }
                  {this.state.selectedUser && 
                  <ChatWindow user = {this.state.selectedUser}/>
                  }
                  {!this.state.selectedUser && <div className='mesgs'>
                    <h3 align="center">
                      <small className="text-muted">Please select a user to view chats.</small>
                    </h3>
                  </div>}
          </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      title: state.login.title,
      requestUsers: state.home.requestUsers,
      users: state.home.users,

      requestAllMessages: state.home.requestAllMessages,
      allMessages: state.home.allMessages,
      fetchError: state.home.fetchError
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestUserList: () => dispatch(homeActions.requestUserList()),
    setUserList: (users) => dispatch(homeActions.setUserList(users)),
    errorUserList: (error) => dispatch(homeActions.errorUserList(error)),
    requestAllMessages: () => dispatch(homeActions.requestAllMessages()),
    setAllMessages: (allMessages) => dispatch(homeActions.setAllMessages(allMessages)),
    errorAllMessages: (error) => dispatch(homeActions.errorAllMessages(error))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);