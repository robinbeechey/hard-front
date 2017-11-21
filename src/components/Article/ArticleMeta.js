import { Link } from 'react-router';
import React from 'react';
import ArticleActions from './ArticleActions';

const ArticleMeta = props => {
    const article = props.article;
    return (
        <div className="article-meta">
            <Link to={`@${article.author.username}`}>
                <img alt="avatar_url" src={article.author.avatar_url}/>
            </Link>

            <div className="info">
                <Link to={`@${article.author.username}`} className="author">
                    {article.author.username}
                </Link>
                <span className="date">
                    {new Date(article.createdAt).toDateString()}
                </span>
            </div>
            <div className="info delete">
                <ArticleActions canModify={props.canModify} article={article} />
            </div>
        </div>
    )
};

export default ArticleMeta;
