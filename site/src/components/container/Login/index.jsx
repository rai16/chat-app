import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './login.scss';
import getApiConfig from '../../../apiConfig.js';
import { auth } from '../../../auth';
import { withRouter } from 'react-router';

var classNames = require('classnames');

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      users: [],
      signupModal: false,
      loginUsername: '',
      loginPassword: '',
      username: '',
      password: '',
      confPassword: '',
      isSignupEnabled: false,
      signupError: '',
      registerMessage: '',
      registerError: '',
      loginError: ''
    };
    this.config = getApiConfig();
    this.toggleSignupModal = this.toggleSignupModal.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfPasswordChange = this.handleConfPasswordChange.bind(this);
    this.checkSignup = this.checkSignup.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.getUsernameList = this.getUsernameList.bind(this);
  }

  getUsernameList(){
    var usernames = this.state.users;
    fetch(this.config.dev.users)
    .then(res => res.json())
    .then((result) => {
      var usernames = result.users.map((item) => item.username);
      this.setState({users: usernames});
      return usernames;
    },
    (error) => {
      return usernames;
    }
    )
    return usernames;
  }

  toggleSignupModal(){
    this.setState({
      signupModal: !this.state.signupModal
    });
  }

  onSignIn(e){
    e.preventDefault();
    fetch(this.config.dev.users + 'login',
    {
      method: 'POST',
      body: JSON.stringify({username: this.state.loginUsername, password: this.state.loginPassword}),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(result => {
        if(result.errors){
          this.setState({loginError: result.errors});
          return;
        }
        //fire action to set some global state that the user has logged in and use it to verify
        if(result.loggedIn){
          auth.authenticate();
          this.props.history.push('/home');
        }

    }, (error) => {
        this.setState({loginError: 'Could not login. Please try again.'});
    });
  }

  onSignup(e){
    e.preventDefault();
    fetch(this.config.dev.users + 'register', 
    {
      method: 'POST',
      body: JSON.stringify({username: this.state.username, password: this.state.password}),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(result => {
      this.setState({
        registerMessage: 'Successfully signed up. You can login now.',
        username: '',
        password: '',
        confPassword: '',
        signupError: ''
    });
      this.toggleSignupModal();

    }, (error) => {
      this.setState({registerError: 'Could not register user. Please try again.'});
    }
    )
  }

  checkSignup(username, usernames, password, confPassword){

    if(username.length > 0 && 
      password.length > 0 && 
      confPassword.length > 0 &&
      !usernames.includes(username) && 
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
    const usernames = this.getUsernameList();
    this.checkSignup(username, usernames, this.state.password, this.state.confPassword);
  }

  handlePasswordChange(e){
    this.setState({
      password: e.target.value,
      signupError: ''
    });
    const pass = e.target.value;
    if(pass.length < 6){
      this.setState({
        isSignupEnabled: false,
        signupError: 'Password should be greater than 6 characters.'
      });
      return;
    }
    this.checkSignup(this.state.username, this.state.users, pass, this.state.confPassword);
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
    this.checkSignup(this.state.username, this.state.users, this.state.password, confpass);
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
            <div className='card card-signin my-5'>
              <div className='card-body'>
                <h5 className='card-title text-center'><b>Sign In</b></h5>
                { this.state.loginError && <div className='alert alert-danger'>
                    {this.state.loginError}
                </div>}
                <form className='form-signin' onSubmit = {this.onSignIn}>
                  <div className='form-label-group'>
                    <input type='text' id='username' onFocus = {() => this.setState({loginError: ''})} onChange = {(e) => this.setState({loginUsername: e.target.value})} value = {this.state.loginUsername} className='form-control' placeholder='Username' required autoFocus/>
                      <label htmlFor='username'>Username</label>
                  </div>

                  <div className='form-label-group'>
                    <input type='password' id='inputPassword' onFocus = {() => this.setState({loginError: ''})} onChange = {(e) => this.setState({loginPassword: e.target.value})} value = {this.state.loginPassword} className='form-control' placeholder='Password' required/>
                      <label htmlFor='inputPassword'>Password</label>
                  </div>
                
                  {/* <div className='custom-control custom-checkbox mb-3'>
                    <input type='checkbox' className='custom-control-input' id='customCheck1'/>
                      <label className='custom-control-label' htmlFor='customCheck1'>Remember password</label>
                  </div> */}
                  <button className='btn btn-lg btn-primary btn-block text-uppercase' type='submit'>Sign in</button>
                  <hr/>
                </form>
                  <button className='btn btn-lg btn-default btn-block text-uppercase' onClick = {this.toggleSignupModal}>New User? Sign up!</button>
                  <Modal isOpen={this.state.signupModal} toggle={this.toggleSignupModal}>
                    <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
                    <ModalBody>
                      <form className='form-signup' onSubmit = {this.onSignup}>
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
export default withRouter(connect(mapStateToProps)(Login));
