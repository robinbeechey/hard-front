import ArticleMeta from './ArticleMeta';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import CommentContainer from './CommentContainer';
import {
    ARTICLE_PAGE_LOADED,
    ARTICLE_PAGE_UNLOADED
} from '../../constants/actionTypes';
import brickwall from '../../img/brickwall_@2X.png';

const mapStateToProps = state => ({
    ...state.article,
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: ARTICLE_PAGE_LOADED, payload}),
    onUnload: () =>
        dispatch({type: ARTICLE_PAGE_UNLOADED})
});

class Article extends React.Component {

    componentWillMount() {
        this.props.onLoad(Promise.all([
            agent.Articles.get(this.props.params.id),
            agent.Comments.forArticle(this.props.params.id)
        ]));
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const article = this.props.article;

        if (!article) {
            return null;
        }

        const canModify = this.props.currentUser &&
            this.props.currentUser.username === article.author.username;

        const meta = (
            <div>
                <h1>{article.title}</h1>
                <ArticleMeta
                    article={article}
                    canModify={canModify}/>
            </div>

        );


        return (
            <div className="article-page">
                {
                    article.image ?
                        <div className="banner image" style={{ backgroundImage: `url(${article.image})`}}>
                        </div>
                        :
                        <div className="banner no-image" style={{ backgroundImage: `url(${brickwall})`}}>
                        </div>

                }


                <div className="container page">
                    <div className="row article-content">
                        <div className="col-xs-12 col-md-8 offset-md-2">
                            {meta}
                            <p>{article.body.substring(0, 200)}...{article.url ?
                                <a href={article.url}> continue reading at article site.</a> : null}</p>
                            <ul className="tag-list">
                                {
                                    article.tagList.map(tag => {
                                        return (
                                            <li className="tag-default tag-pill tag-outline"
                                                key={tag}>
                                                {tag}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <hr />
                        </div>
                    </div>


                    <div className="article-actions"></div>

                    <div className="row">
                        <CommentContainer
                            comments={this.props.comments || []}
                            errors={this.props.commentErrors}
                            slug={this.props.params.id}
                            currentUser={this.props.currentUser}/>

                    </div>
                </div>
            </div>
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);

