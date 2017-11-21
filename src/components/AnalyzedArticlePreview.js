import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
    ARTICLE_SUBMITTED
} from '../constants/actionTypes';
import brickwall from '../img/brickwall_@2X.png';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    ...state.home
});

const mapDispatchToProps = dispatch => ({
    onSubmit: payload =>
        dispatch({type: ARTICLE_SUBMITTED, payload}),
});

class AnalyzedArticlePreview extends React.Component {

    constructor() {
        super();

        this.state = {
            title: '',
            body: '',
            image: '',
            url: '',
            tagList: [],
            publication_date: '',
            publisher_author: ''
        };
    }

    _handleSubmit(e) {
        e.preventDefault();
        let article = this.state;
        if (this.props.currentUser) {
            this.props.onSubmit(agent.Articles.create(article));
        } else {
        }

    }

    renderSubmit() {
        if (this.props.currentUser) {
            return (
                <div className="submit-bar">
                    <p>This article has not been submitted</p>&nbsp;
                    <button onClick={(e) => this._handleSubmit(e)} className="btn btn-sm btn-primary">Submit</button>
                </div>
            )
        } else {
            return (
                <div className="submit-bar">
                    <p>This article has not been submitted
                        &nbsp;
                        <Link to="login">Sign in</Link>
                        &nbsp;or&nbsp;
                        <Link to="register">Sign up</Link>
                        &nbsp;to submit this article
                    </p>
                </div>
            )
        }

    }

    componentWillMount() {

        let { title, body, image, tagList, publisher_author, publication_date } = this.props.article;
        this.setState({
            title,
            body,
            url: this.props.url,
            image,
            tagList,
            publication_date,
            publisher_author
        })
    }

    render() {
        const article = this.props.article;

        return (
            <div>

                <ListErrors errors={this.props.errors}/>
                {this.renderSubmit()}
                <div className="article-preview">
                    <div className="article-meta">

                        {
                            article.image ?
                                <div style={{ backgroundImage: `url(${article.image})`}}
                                     className="article-image"></div>
                                :
                                <div style={{ backgroundImage: `url(${brickwall})`}}
                                     className="article-image no-image"></div>
                        }

                        <div className="info analyzed">
                            <div className="author">
                                {article.publisher_author }
                            </div>
                            <span className="date">
                                {new Date(article.publication_date).toDateString()}
                            </span>
                        </div>
                    </div>
                    <div className="preview-link">
                        <h1>{article.title}</h1>
                        <p>{article.body.substring(0, 100)}...</p>
                        &nbsp;
                        <ul className="tag-list">
                            {
                                article.tagList.map(tag => {
                                    return (
                                        <li className="tag-default tag-pill tag-outline" key={tag}>
                                            {tag}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                </div>
            </div>

        )
    }


};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzedArticlePreview);