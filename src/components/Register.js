import { Link } from 'react-router';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'email', value}),
    onChangePassword: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'password', value}),
    onChangeUsername: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'username', value}),
    onSubmit: (username, email, password) => {
        dispatch({type: REGISTER, payload: agent.Auth.register(username, email, password)})
    },
    onUnload: () =>
        dispatch({type: REGISTER_PAGE_UNLOADED})
});

class Register extends React.Component {
    constructor() {
        super();
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
        this.submitForm = (username, email, password) => ev => {
            ev.preventDefault();
            this.props.onSubmit(username, email, password);
        }
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;
        const username = this.props.username;

        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 col-xs-12">
                            <h3 className="text-xs-center">Sign Up</h3>
                            <p className="text-xs-center">
                                <Link to="login">
                                    Have an account?
                                </Link>
                            </p>

                            <ListErrors errors={this.props.errors}/>

                            <form onSubmit={this.submitForm(username, email, password)}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control"
                                            type="text"
                                            placeholder="Username"
                                            value={this.props.username}
                                            onChange={this.changeUsername}
                                        />
                                        <br />
                                        <input
                                            className="form-control form-control"
                                            type="email"
                                            placeholder="Email"
                                            value={this.props.email}
                                            onChange={this.changeEmail}
                                        />
                                        <br />
                                        <input
                                            className="form-control form-control"
                                            type="password"
                                            placeholder="Password"
                                            value={this.props.password}
                                            onChange={this.changePassword}
                                        />
                                    </fieldset>
                                    <button
                                        className="btn btn-primary pull-xs-right"
                                        type="submit"
                                        disabled={this.props.inProgress}>
                                        Sign Up!
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
