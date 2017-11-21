import React from 'react';
import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';
import Spinner from './Spinner';

const ArticleList = props => {
    if(!props.articles){
        return (
            <Spinner />
        )
    };

    if (props.articles.length === 0){

        return (
            <div className="article-preview">
                No articles are here... yet.
            </div>
        )
    };

    return (
        <div>
            {
                props.articles.map(article => {
                    return (
                        <ArticlePreview key={article.slug} article={article}/>
                    )
                })
            }
            <ListPagination
                articlesCount={props.articlesCount}
                currentPage={props.currentPage}
                onSetPage={props.onSetPage}/>
        </div>
    )

};


export default ArticleList;

