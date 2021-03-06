import React from 'react';
import { Link } from 'react-router';
import DeleteButton from './DeleteButton';

const Comment = props => {
    const comment = props.comment;
    const show = props.currentUser &&
        props.currentUser.username === comment.author.username;
    return (
        <div className="card">
            <div className="card-block">
                <p className="card-text">{comment.body}</p>
            </div>
            <div className="card-footer">
                <Link
                    to={`@${comment.author.username}`}
                    className="comment-author">
                    <img alt="avatar_url" src={comment.author.avatar_url} className="comment-author-img"/>
                </Link>
                &nbsp;
                <Link to={`@${comment.author.username}`}
                      className="comment-author">
                    {comment.author.username}
                </Link>
                <span className="date-posted">
                    {new Date(comment.createdAt).toDateString()}
                </span>
                <DeleteButton show={show} slug={props.slug} commentId={comment.id}/>
            </div>
        </div>
    )
};

export default Comment;
