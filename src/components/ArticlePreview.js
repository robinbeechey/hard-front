import { Link } from 'react-router'
import React from 'react';
import { connect } from 'react-redux';
import brickwall from '../img/brickwall_@2X.png';
import agent from '../agent';
import {
    ARTICLE_FAVORITED,
    ARTICLE_UNFAVORITED
} from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
    favorite: (slug) => dispatch({
        type: ARTICLE_FAVORITED, payload: agent.Articles.favorite(slug)
    }),
    unfavorite: (slug) => dispatch({
        type: ARTICLE_UNFAVORITED, payload: agent.Articles.unfavorite(slug)
    })

});

const ArticlePreview = props => {
    const article = props.article;

    const favoriteButtonClass = article.favorited ?
        FAVORITED_CLASS :
        NOT_FAVORITED_CLASS;

    const handleClick = e => {
        e.preventDefault();
        if (article.favorited) {
            props.unfavorite(article.slug)
        } else {
            props.favorite(article.slug)
        }
    };

    return (
        <div className="article-preview">
            {
                article.image ?
                    <Link to={`article/${article.slug}`}>
                        <div style={{ backgroundImage: `url(${article.image})`}} className="article-image"></div>
                    </Link>
                    :
                    <Link to={`article/${article.slug}`}>
                        <div style={{ backgroundImage: `url(${brickwall})`}} className="article-image no-image"></div>
                    </Link>
            }


            <div className="article-meta">
                <Link to={`@${article.author.username}`}>
                    <img alt="avatar_url" src={article.author.avatar_url}/>
                </Link>

                <div className="info">
                    <Link to={`@${article.author.username}`} className="author">
                        {article.author.username }
                    </Link>
                    <span className="date">
                        {new Date(article.createdAt).toDateString()}
                    </span>
                </div>

                <div className="pull-xs-right">
                    <button onClick={(e) => handleClick(e)}
                            className={favoriteButtonClass}>
                        <i className="ion-heart"/> {article.favoritesCount}
                    </button>
                </div>

            </div>

            <div className="preview-link">

                <Link to={`article/${article.slug}`}>
                    <h1>{article.title}</h1>
                </Link>

                <p>{article.body.substring(0, 70)}...</p>
                <span><Link to={`article/${article.slug}`}>Discuss</Link> or {article.url ?
                    <a target="blank" href={article.url}> go to article site</a> : null}</span>
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
    )
};

export default connect(()=> ({}), mapDispatchToProps)(ArticlePreview);