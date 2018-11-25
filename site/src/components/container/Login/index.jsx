import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './login.scss';
import getApiConfig from '../../../apiConfig.js';
var classNames = require('classnames');

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      users: [],
      signupModal: false,
      username: '',
      password: '',
      confPassword: '',
      isSignupEnabled: false,
      signupError: ''
    };
    this.config = getApiConfig();
    this.toggleSignupModal = this.toggleSignupModal.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfPasswordChange = this.handleConfPasswordChange.bind(this);
    this.checkSignup = this.checkSignup.bind(this);
  }

  componentDidMount(){
    fetch(this.config.dev.users)
    .then(res => res.json())
    .then((result) => {
      var usernames = result.users.map((item) => item.username);
      this.setState({usernames});
    },
    (error) => {
      this.setState({signupError: 'Failed to fetch user list.'});
    }
    )
  }

  toggleSignupModal(){
    this.setState({
      signupModal: !this.state.signupModal
    });
  }

  checkSignup(username, password, confPassword){

    if(username.length > 0 && 
      password.length > 0 && 
      confPassword.length > 0 &&
      !this.state.usernames.includes(username) && 
      password === confPassword){
          this.setState({isSignupEnabled: true});
    }
    else{
      this.setState({isSignupEnabled: false});
    }
  }

//validate all rules for the particular field and at the and check whether signup should be enabled
  handleUsernameChange(e){
    this.setState({
      username: e.target.value,
      signupError: ''
    });

    const username = e.target.value;

    if(username.length < 2 || !username.match(/^[a-z0-9_-]{3,15}$/)){
      this.setState({
        isSignupEnabled: false,
        signupError: 'Username format not correct'
      });
      return;
    }
    this.checkSignup(username, this.state.password, this.state.confPassword);
  }

  handlePasswordChange(e){
    this.setState({
      password: e.target.value,
      signupError: ''
    });
    const pass = e.target.value;
    if(pass.length < 6){
      console.log('pass is short');
      this.setState({
        isSignupEnabled: false,
        signupError: 'Password should be greater than 6 characters.'
      });
      return;
    }
    this.checkSignup(this.state.username, pass, this.state.confPassword);
  }

  handleConfPasswordChange(e){
    this.setState({
      confPassword: e.target.value,
      signupError: ''
    });
    const confpass = e.target.value;
    if(confpass.length < 1){
      return;
    }
    this.checkSignup(this.state.username, this.state.password, confpass);
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
            <div className='card card-signin my-5'>
              <div className='card-body'>
                <h5 className='card-title text-center'><b>Sign In</b></h5>
                <form className='form-signin'>
                  <div className='form-label-group'>
                    <input type='text' id='username' className='form-control' placeholder='Username' required autoFocus/>
                      <label htmlFor='username'>Username</label>
                  </div>

                  <div className='form-label-group'>
                    <input type='password' id='inputPassword' className='form-control' placeholder='Password' required/>
                      <label htmlFor='inputPassword'>Password</label>
                  </div>
                
                  <div className='custom-control custom-checkbox mb-3'>
                    <input type='checkbox' className='custom-control-input' id='customCheck1'/>
                      <label className='custom-control-label' htmlFor='customCheck1'>Remember password</label>
                  </div>
                  <button className='btn btn-lg btn-primary btn-block text-uppercase' type='submit'>Sign in</button>
                  <hr/>
                </form>
                  <button className='btn btn-lg btn-default btn-block text-uppercase' onClick = {this.toggleSignupModal}>New User? Sign up!</button>
                  <Modal isOpen={this.state.signupModal} toggle={this.toggleSignupModal}>
                    <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
                    <ModalBody>
                      <form className='form-signup'>
                        <div className='form-label-group'>
                          <input type='text' id='inputUsername' value = {this.state.username} onChange = {this.handleUsernameChange} className='form-control' placeholder='Username' required autoFocus/>
                          <label htmlFor='inputUsername'>Username</label>
                          <small id='usernameHelp' className='form-text text-muted'>
                          Username has to be 3 to 15 characters with any lower case character, digit or special symbol “_-” only.
                          </small>
                        </div>

                        <div className='form-label-group'>
                          <input type='password' id='inputPassword' value = {this.state.password} onChange = {this.handlePasswordChange} className='form-control' placeholder='Password' required/>
                            <label htmlFor='inputPassword'>Password</label>
                        </div>

                        <div className='form-label-group'>
                          <input type='password' id='inputConfirmPassword' value = {this.state.confPassword} onChange = {this.handleConfPasswordChange} className='form-control' placeholder='Confirm Password' required/>
                            <label htmlFor='inputConfirmPassword'>Confirm Password</label>
                        </div>
                        <button disabled = {!this.state.isSignupEnabled} className={classNames('btn btn-lg btn-primary btn-block text-uppercase')} 
                                type='submit'
                        >
                          Sign Up
                        </button>
                      </form>
                    </ModalBody>
                  </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
      title: state.login.title
    };
}
export default connect(mapStateToProps)(Login);
