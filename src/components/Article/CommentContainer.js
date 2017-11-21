import { Link } from 'react-router';
import React from 'react';
import ListErrors from '../../components/ListErrors';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

const CommentContainer = props => {
    if (props.currentUser) {
        return (
            <div className="col-xs-12 col-md-8 offset-md-2">
                <div>
                    <ListErrors errors={props.errors}/>
                    <CommentInput slug={props.slug} currentUser={props.currentUser}/>
                </div>
                <CommentList
                    comments={props.comments}
                    slug={props.slug}
                    currentUser={props.currentUser}/>
            </div>
        )
    } else {
        return (
            <div className="col-xs-12 col-md-8 offset-md-2">
                <p>
                    <Link to="login">Sign in</Link>
                    &nbsp;or&nbsp;
                    <Link to="register">Sign up</Link>
                    &nbsp;to add comments on this article.
                    <CommentList
                        comments={props.comments}
                        slug={props.slug}
                        currentUser={props.currentUser}/>
                </p>
            </div>
        )
    }
};


export default CommentContainer;
