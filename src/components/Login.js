import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
    UPDATE_FIELD_AUTH,
    LOGIN,
    LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'email', value}),
    onChangePassword: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'password', value}),
    onSubmit: (email, password) => {
        dispatch({type: LOGIN, payload: agent.Auth.login(email, password)})
    },
    onUnload: () =>
        dispatch({type: LOGIN_PAGE_UNLOADED}),
});

class Login extends React.Component {
    constructor() {
        super();
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.submitForm = (email, password) => ev => {
            ev.preventDefault();
            this.props.onSubmit(email, password);
        };

    }

    componentWillUnmount() {

        this.props.onUnload();
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;
        const errors = this.props.errors;

        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 col-xs-12">
                            <h3 className="text-xs-center">Sign In</h3>
                            <p className="text-xs-center">
                                <Link to="register">
                                    Need an account?
                                </Link>
                            </p>


                            <ListErrors errors={errors}/>

                            <form onSubmit={this.submitForm(email, password)}>
                                <fieldset>
                                    <fieldset>
                                        <input
                                            className="form-control form-control"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={this.changeEmail}
                                        />
                                    </fieldset>
                                    <br />
                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={this.changePassword}
                                        />
                                    </fieldset>
                                    <button
                                        className="btn btn-primary pull-xs-right"
                                        type="submit"
                                        disabled={this.props.inProgress}>
                                        Sign in
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);