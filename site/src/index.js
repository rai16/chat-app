import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Login from './components/container/Login/index.jsx';
import Home from './components/container/Home/index.jsx';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers/rootReducer';
import {auth} from './auth';
import socketMiddleware from './middleware/socketMiddleware';

const store = createStore(rootReducer, applyMiddleware(socketMiddleware()));

function PrivateRoute({ component: Component, ...rest }) {

    return (
      <Route
        {...rest}
        render={props =>
          auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }


class Main extends Component{
    render(){
            return(
            <Provider store = {store}>
                <Router>
                    <div>
                        <Route exact path = '/' render = {() => <Login onLoginSuccess = {this.toggleAuthenticate}/>}/>
                         <PrivateRoute path="/home" component={Home} />
                    </div>
                </Router>
            </Provider>
            );
    }
}
ReactDOM.render(<Main/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
