import React from 'react';
import { connect } from 'react-redux';
import agent from './agent';
import Header from './components/Header';
import PropTypes from 'prop-types';
import './css/App.css';
import {
    REDIRECT,
    APP_LOAD
} from './constants/actionTypes';

const mapStateToProps = state => ({
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
    onRedirect: () => {
        dispatch({type: REDIRECT})
    },
    onLoad: (payload, token) => {
        dispatch({type: APP_LOAD, payload, token})
    }
});

class App extends React.Component {

    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            agent.setToken(token);
        }
        this.props.onLoad(token ? agent.Auth.current() : null, token)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.context.router.replace(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }

    render() {
        if (this.props.appLoaded) {
            return (
                <div>
                    <div>
                        <Header appName={this.props.appName} currentUser={this.props.currentUser}/>
                        {this.props.children}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <Header appName={this.props.appName} currentUser={this.props.currentUser}/>
                    </div>
                </div>
            );
        }

    }
}

//App.contextTypes = {
//    router: PropTypes.object.isRequired
//};

export default connect(mapStateToProps, mapDispatchToProps)(App);