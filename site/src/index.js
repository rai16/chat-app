import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Login from './components/container/Login/index.jsx';
import Home from './components/container/Home/index.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

// const routes = [
//     {path: '/', component: Login},
//     {path: '/home', component: Home}
//   ];

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated : false
        };
    }
    authenticate(){
        this.setState({
            isAuthenticated: true
        });
    }
    render(){ 
            return(
            <Provider store = {store}>
                <Router>
                    <div>
                        <Route exact path = '/' component = {Login}/>
                        <Route exact path = '/home' component = {Home}/>
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
