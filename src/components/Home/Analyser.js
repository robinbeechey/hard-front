import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import {Link} from 'react-router';
import ListErrors from '../ListErrors';
import Spinner from '../Spinner';
import ArticlePreview from '../ArticlePreview';
import AnalyzedArticlePreview from '../AnalyzedArticlePreview';
import {
    ARTICLE_SEARCH,
    ANALYSE_ARTICLE
} from '../../constants/actionTypes';


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    ...state.home,
});

const mapDispatchToProps = dispatch => ({
    onSearch: (payload) => dispatch(
        {type: ARTICLE_SEARCH, payload}
    ),
    onAnalyze: (payload) => dispatch(
        {type: ANALYSE_ARTICLE, payload}
    )
});


class Analyser extends React.Component {

    constructor() {
        super();

        this.state = {
            url: '',
            article: null
        };

    }

    _handleChange(e) {
        var value = e.target.value;
        this.setState({url: value});
    }

    _handleClick(e) {
        e.preventDefault();
        //console.log('clicked');

        if (this.state.url) {
            agent.Articles.byUrl(this.state.url)
                .then(
                    res => {

                        if (res.articles.length > 0) {
                            //console.log('analysing > 0', res, this.props.searchResult);
                            this.props.onSearch(res);
                        } else if (res.articles.length === 0) {
                            this.props.onSearch(res);
                            //console.log('analysing = 0', res, this.props.searchResult);
                            this.props.onAnalyze(agent.Articles.analyze(this.state.url));
                        }

                    },
                    error => {
                        //console.log('error', error);
                        //action.error = true;
                        //action.payload = error.response.body;
                        //store.dispatch(action);
                    });
        }


        this.setState({
            article: this.props.article
        });

    }


    render() {

        const article = this.props.searchResult;
        const analyzedArticle = this.props.analyzedArticle;
        const isAuthed = this.props.currentUser && this.props.currentUser.token;

        return (

            <div className="row">
                <div className="col-xs-12">
                    <ListErrors errors={this.props.errors}/>
                    <form onSubmit={(e) => this._handleClick(e)} className="input-group">
                        <input className="form-control" placeholder="Paste the url of an article to check if its been submitted"
                               value={this.state.url} onChange={(e) => this._handleChange(e)} type="search"/>
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="submit">Go!</button>
                        </span>
                    </form>
                </div>

                <div className="col-xs-12">
                    <Spinner inProgress={this.props.inProgress}/>
                    { article ?
                        <div className="search-result">
                            <p>This article has already been submitted by <Link className="username"
                                                                                to={`@${article.author.username}`}>
                                {article.author.username }
                            </Link> click on it to start discussing</p>
                            <ArticlePreview article={article}/>
                        </div>
                        :
                        analyzedArticle && !this.props.errors ?
                            <AnalyzedArticlePreview url={this.state.url} isAuthed={isAuthed}
                                                    article={analyzedArticle.article}/>
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analyser);

