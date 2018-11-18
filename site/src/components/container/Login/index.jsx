import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './login.scss';
var classNames = require('classnames');

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      signupModal: false,
      username: '',
      password: '',
      confPassword: '',
      isSignupEnabled: false,
      signupError: ''
    };

    this.toggleSignupModal = this.toggleSignupModal.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePassWordChange = this.handlePassWordChange.bind(this);
    this.handleConfPasswordChange = this.handleConfPasswordChange.bind(this);
  }

  toggleSignupModal(){
    this.setState({
      signupModal: !this.state.signupModal
    });
  }
//validate all rules for the particular field and at the and check whether signup should be enabled
  handleUsernameChange(e){
    this.setState({
      username: e.target.value,
      signupError: ''
    });

    const username = e.target.value;

    if(!username.match(/^[a-z0-9_-]{3,15}$/)){
      this.setState({
        isSignupEnabled: false,
        signupError: 'Username format not correct'
      });
      return;
    }


  }

  handlePassWordChange(e){
    this.setState({
      password: e.target.value,
      signupError: ''
    });
    const pass = e.target.value;
    if(pass !== this.state.confPassword){
      this.setState({
        isSignupEnabled: false,
        signupError: 'Password and Confirm password does not match.'
      });
      return;
    }
  }

  handleConfPasswordChange(e){
    this.setState({
      confPassword: e.target.value,
      signupError: ''
    });
    const confpass = e.target.value;
    if(confpass !== this.state.password){
      this.setState({
        isSignupEnabled: false,
        signupError: 'Password and Confirm password does not match.'
      });
      return;
    }
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
                          <input type='password' id='inputPassword' value = {this.state.password} onChange = {this.handlePassWordChange} className='form-control' placeholder='Password' required/>
                            <label htmlFor='inputPassword'>Password</label>
                        </div>

                        <div className='form-label-group'>
                          <input type='password' id='inputConfirmPassword' value = {this.state.confPassword} onChange = {this.handleConfPasswordChange} className='form-control' placeholder='Confirm Password' required/>
                            <label htmlFor='inputConfirmPassword'>Confirm Password</label>
                        </div>
                        <button className={classNames('btn btn-lg btn-primary btn-block text-uppercase', {disabled: !this.state.isSignupEnabled} )} 
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
