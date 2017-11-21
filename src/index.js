import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router';

import App from './App';
import Article from './components/Article';
import Editor from './components/Editor';
import Home from './components/Home/Index';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileFavorites from './components/ProfileFavorites';
import Register from './components/Register';
import Settings from './components/Settings';
import About from './components/About';
import store from './store';

let logPageView = null;

if (process.env.NODE_ENV === 'production') {
    var ReactGA = require('react-ga');
    ReactGA.initialize('UA-102603235-1');

    logPageView = function logPageView() {
        ReactGA.set({page: window.location.pathname});
        ReactGA.pageview(window.location.pathname);
    }
}


//maybe routes dont need to begin with slashes

ReactDOM.render((
    <Provider store={store}>
        <Router onUpdate={logPageView} history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/article/:id" component={Article}/>
                <Route path="/@:username" component={Profile}/>
                <Route path="/@:username/favorites" component={ProfileFavorites}/>
            </Route>
        </Router>
    </Provider>

), document.getElementById('root'));
