import React from 'react';
import { connect} from 'react-redux';
import agent from '../../agent';
import {
    ADD_COMMENT
} from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
    onSubmit: payload =>
        dispatch({type: ADD_COMMENT, payload})
});

class CommentInput extends React.Component {
    constructor(){
        super();
        this.state = {
            body: ''
        };

        this.setBody = ev => {
            this.setState({body: ev.target.value});
        };

        this.createComment = ev => {
            ev.preventDefault();
            const payload = agent.Comments.create(this.props.slug, {body: this.state.body});
            this.setState({ body: ''});
            this.props.onSubmit(payload);
        };
    }

    render(){
        return (
            <form className="card comment-form" onSubmit={this.createComment}>
                <div>
                    <textarea
                        className="form-control"
                        placeholder="Write a comment..."
                        value={this.state.body}
                        onChange={this.setBody}
                        rows="3"/>
                </div>
                <div className="card-footer">
                    <img
                        alt="author-img"
                        src={this.props.currentUser.avatar_url}
                        className="comment-author-img"/>
                    <button
                        className="btn btn-sm btn-primary"
                        type="submit">
                        Post Comment
                    </button>
                </div>
            </form>
        )
    }
}


export default connect(() => ({}), mapDispatchToProps)(CommentInput);