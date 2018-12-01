import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../home.scss';
import Header from '../../Header';
import UserListWindow from '../../UserListWindow';
import ChatWindow from '../../ChatWindow';

class Home extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <Header/>
        <div className='messaging row'>
          <div className='inbox_msg'>
                  <UserListWindow/>
                  <ChatWindow/>
          </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      title: state.login.title
    }
};
export default connect(mapStateToProps)(Home);