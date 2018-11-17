import React from 'react';
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

const routes = [
    {path: '/', component: Login},
    {path: '/home', component: Home}
  ];

ReactDOM.render( 
        <Provider store = {store}>
            <Router>
                <div>
                    {routes.map((route, key) => {
                    return (<Route exact path= {route.path} component = {route.component}/>);
                    })}
                </div>
            </Router>
        </Provider>
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
