import ListErrors from './ListErrors';
import SuccessMessage from './SuccessMessage';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import FileUpload from './FileUpload';
import {
    LOGOUT,
    SETTINGS_SAVED,
    SETTINGS_PAGE_UNLOADED,
    SETTINGS_PAGE_LOADED
} from '../constants/actionTypes';


class SettingsForm extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            bio: '',
            email: '',
            password: '',
        };

        this.updateState = field => ev => {
            const state = this.state;
            const newState = Object.assign({}, state, {[field]: ev.target.value});
            this.setState(newState);
        };

        //this.submitForm = ev => {
        //    ev.preventDefault();
        //
        //    const user = Object.assign({}, this.state);
        //
        //    console.log('submit', this.state, user);
        //
        //    if (!user.password) {
        //        console.log('del');
        //        delete user.password;
        //        console.log('deleted', user);
        //    }
        //
        //
        //    this.props.onSubmitForm(agent.Auth.save(user));
        //
        //
        //};

    }


    _handleSubmit(ev) {
        ev.preventDefault();

        const user = Object.assign({}, this.state);


        if (!user.password) {
            delete user.password;
        }


        this.props.onSubmitForm(agent.Auth.save(user));
    }

    //how the hell is this even working and do i need WillReceiveProps?

    componentWillMount() {
        if (this.props.currentUser) {
            Object.assign(this.state, {
                username: this.props.currentUser.username,
                bio: this.props.currentUser.bio,
                email: this.props.currentUser.email
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser) {
            this.setState(Object.assign({}, this.state, {
                username: nextProps.currentUser.username,
                bio: nextProps.currentUser.bio,
                email: nextProps.currentUser.email
            }));
        }
    }

    componentWillUnmount() {
        this.props.onUnLoad();
    }

    render() {

        return (
            <form onSubmit={(ev) => this._handleSubmit(ev)}>
                <ListErrors errors={this.props.errors}/>
                <SuccessMessage message={this.props.successMessage}/>
                <fieldset>
                    <br/>
                    <fieldset>
                        <textarea
                            rows="3"
                            className="form-control"
                            type="text"
                            placeholder="Bio"
                            value={this.state.bio}
                            onChange={this.updateState('bio')}/>
                    </fieldset>
                    <br/>
                    <fieldset>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.updateState('email')}/>
                    </fieldset>
                    <br/>
                    <fieldset>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.updateState('password')}/>
                    </fieldset>
                    <br/>
                    <button
                        className="btn btn-primary pull-xs-right"
                        type="submit"
                        disabled={this.state.inProgress}>
                        Update
                    </button>
                </fieldset>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    ...state.settings,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({type: LOGOUT}),
    onSubmitForm: payload => {
        dispatch({type: SETTINGS_SAVED, payload: payload});
    },
    onUnLoad: () => dispatch({type: SETTINGS_PAGE_UNLOADED}),
    onLoad: () => dispatch({type: SETTINGS_PAGE_LOADED}),
});


class Settings extends React.Component {

    constructor(){
        super();
    }

    componentWillMount(){
        this.props.onLoad();
    }

    render() {
        return (
            <div className="settings-page">
                <div className="container page">
                    <div className="col-md-4 offset-md-4 col-xs-12">
                        <h3 className="text-xs-center">Settings</h3>


                        <FileUpload
                            currentUser={this.props.currentUser}/>

                        <ListErrors errors={this.props.errors}/>

                        <SettingsForm
                            currentUser={this.props.currentUser}
                            onSubmitForm={this.props.onSubmitForm}
                            onUnLoad={this.props.onUnLoad}
                        />

                        <hr />
                        <button
                            className="btn btn-outline-danger"
                            onClick={this.props.onClickLogout}>
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);