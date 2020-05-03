import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../home.scss';
import UserListWindow from '../../UserListWindow';
import ChatWindow from '../../ChatWindow';
import {auth} from '../../../auth';
import getApiConfig from '../../../apiConfig.js';
import * as userActions from '../../../actions/userActions';
import * as messageActions from '../../../actions/messageActions';

class Home extends Component {

  constructor(props){
    super(props);
    this.config = getApiConfig();
    this.state = {
      selectedUser: null,
      messageThread: null,
      users: null
    }
    this.changeSelectedUser = this.changeSelectedUser.bind(this);
    this.initMessageThread = this.initMessageThread.bind(this);
    this.defineUserLastMessage = this.defineUserLastMessage.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.users)
      this.setState({users: nextProps.users});
  }

  componentDidMount(){
    this.props.requestUserList();
    this.props.requestAllMessages();
    var options = {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Token '+auth.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
  }

    var userListApi = fetch(this.config.dev.users, options).then(res => res.json());
    var mssgListApi = fetch(this.config.dev.messages + '/' + auth.userid, options).then(res => res.json());
    Promise.all([userListApi, mssgListApi])
    .then((values) => {
      //remove yourself from the list of people you can chat with
      var users = values[0].users.filter((obj) => obj._id !== auth.userid);
      this.props.setUserList(users);
      this.props.setAllMessages(values[1].allMessages);
      this.initMessageThread(users, values[1].allMessages);
      this.defineUserLastMessage();
    },
    (error) => {
      alert('error in fetching users/messages');
    });
  }

//get all users and their messages, pick the latest message and add it to user metadata.
//This will be used to display the lasst message in User details
  defineUserLastMessage(){
    var mssgThread = this.state.messageThread;
    var users = this.state.users;
    users.forEach((user) => {
      var mssgArray = mssgThread.get(user._id);
        user.lastMessage = (mssgArray && mssgArray.length > 0) ? mssgArray[mssgArray.length - 1] : '';
    });
    this.setState({users});
    this.forceUpdate();
  }

//Create a message map from list of all messages
  initMessageThread(users, messages){
      var mssgThread = new Map();
      var temp;
      messages.forEach(message => {
         var user_id = (message.user_from === auth.userid) ? message.user_to : message.user_from;
         if(!mssgThread.has(user_id)){
            temp = [message];
            mssgThread.set(user_id, temp);
         }
         else{
           temp = mssgThread.get(user_id);
           temp.push(message);
           mssgThread.set(user_id, temp);
         }
      });
      this.setState({messageThread: mssgThread});
  }

//when someone clicks at a new user
  changeSelectedUser(user){
    this.setState({selectedUser: user});
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='messaging row'>
          <div className='inbox_msg'>
                  {this.props.users &&
                  this.props.allMessages &&
                  this.props.users.length > 0 &&
                  <UserListWindow users = {this.state.users} onSelectedUserChange = {this.changeSelectedUser}/>
                  }
                  {this.state.selectedUser &&
                  <ChatWindow user = {this.state.selectedUser} messageThread = {this.state.messageThread}/>
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
    requestUserList: () => dispatch(userActions.requestUserList()),
    setUserList: (users) => dispatch(userActions.setUserList(users)),
    errorUserList: (error) => dispatch(userActions.errorUserList(error)),
    requestAllMessages: () => dispatch(messageActions.requestAllMessages()),
    setAllMessages: (allMessages) => dispatch(messageActions.setAllMessages(allMessages)),
    errorAllMessages: (error) => dispatch(messageActions.errorAllMessages(error))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
