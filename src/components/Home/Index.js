import Banner from './Banner';
import Footer from './Footer';
import MainView from './MainView';
import Tags from './Tags';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
    APPLY_TAG_FILTER,
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED
} from '../../constants/actionTypes';

//const Promise = global.Promise;


const mapStateToProps = state => ({
    ...state.home,
    appName: state.common.appName,
    token: state.common.token
});

const mapDispatchToProps = dispatch => ({
    onClickTag: (tag, payload) =>
        dispatch({type: APPLY_TAG_FILTER, tag, payload}),
    onLoad: (tab, payload) =>
        dispatch({type: HOME_PAGE_LOADED, tab, payload}),
    onUnLoad: () =>
        dispatch({type: HOME_PAGE_UNLOADED})
});

class Home extends React.Component {
    componentWillMount() {
        const tab = this.props.token ? 'feed' : 'all';
        const articlesPromise = this.props.token ?
            agent.Articles.feed() :
            agent.Articles.all();

        this.props.onLoad(tab, Promise.all([agent.Tags.getAll(), articlesPromise]));
    }

    componentWillUnmount(){
        this.props.onUnLoad();
    }

    render() {
        return (
            <div className="home-page">
                <Banner appName={this.props.appName}/>
                <div className="container page">
                    <div className="row">
                        <MainView />
                        <div className="col-md-3 col-xs-12 sidebar-container">
                            <div className="sidebar">
                                <p>Popular Tags</p>

                                <Tags
                                    tags={this.props.tags}
                                    onClickTag={this.props.onClickTag}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer appName={this.props.appName} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

