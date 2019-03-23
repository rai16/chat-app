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
  }

  componentDidMount(){
    this.props.requestUserList();
    fetch (this.config.dev.users)
    .then(res => res.json())
    .then((result) => {
     // console.log('inside home coponent did mount ---' + result.users);
      this.props.setUserList(result.users);
    },
    (error) => {
        alert('Problem fetching user list. Please refresh.');
        this.props.errorUserList('Error fetching user list.');
    });

    this.props.requestAllMessages();
    fetch(this.config.dev.messages + '/'+auth.userid)
    .then(res => res.json())
    .then((result) => {
     this.props.setAllMessages(result.allMessages);
    },
    (error) => {
      alert('Problem fetching user messages. Please refresh.');
      this.props.errorAllMessages('Problem fetching user messages. Please refresh.');
    }
    )
  }

  render() {
    console.log('inside home: ' + this.props.users);
    return (
      <div className='container-fluid'>
        <Header/>
        <div className='messaging row'>
          <div className='inbox_msg'>
                  {this.props.users && this.props.users.length > 0 && <UserListWindow users = {this.props.users}/>}
                  <ChatWindow/>
          </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
    console.log('inside home map state to props: ');
    console.log(state);
    return {
      title: state.login.title,
      requestUsers: state.home.requestUsers,
      users: state.home.users,
      usersError: state.home.errorUsers,

      requestAllMessages: state.home.requestAllMessages,
      allMessages: state.home.allMessages,
      allMessagesError: state.home.allMessagesError
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