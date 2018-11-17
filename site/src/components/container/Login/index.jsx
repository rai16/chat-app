import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.scss';

class Login extends Component {
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
                    <input type='email' id='inputEmail' className='form-control' placeholder='Email address' required autoFocus/>
                      <label htmlFor='inputEmail'>Email address</label>
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
                  <button className='btn btn-lg btn-default btn-block text-uppercase'>New User? Sign up!</button>
                
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
