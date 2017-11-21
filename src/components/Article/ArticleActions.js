import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
    DELETE_ARTICLE
} from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
    onClickDelete: payload =>
        dispatch({type: DELETE_ARTICLE, payload})
});


const ArticleActions = props => {
    const article = props.article;
    const del = () => {
        props.onClickDelete(agent.Articles.del(article.slug));
    };

    if (props.canModify) {
        return (
            <span className="delete">
                <button className="btn btn-outline-danger btn-sm" onClick={del}>
                    <i className="ion-trash-a"></i>
                </button>
            </span>
        )
    } else {
        return (
            <span>

            </span>
        )
    }


};

export default connect(()=> ({}), mapDispatchToProps)(ArticleActions);