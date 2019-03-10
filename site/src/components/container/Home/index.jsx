import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../home.scss';
import Header from '../../Header';
import UserListWindow from '../../UserListWindow';
import ChatWindow from '../../ChatWindow';
import {auth} from '../../../auth';
import getApiConfig from '../../../apiConfig.js';

class Home extends Component {
  
  constructor(props){
    super(props);
    this.config = getApiConfig();
  }

  componentDidMount(){
    fetch(this.config.dev.messages + '/'+auth.userid)
    .then(res => res.json())
    .then((result) => {
      console.log('result: ' + result);
    },
    (error) => {
      
    }
    )
  }

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