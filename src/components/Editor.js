import React from 'react';
import agent from '../agent';
import ListErrors from './ListErrors';
import { connect } from 'react-redux';
import {
    ADD_TAG,
    REMOVE_TAG,
    EDITOR_PAGE_LOADED,
    EDITOR_PAGE_UNLOADED,
    ARTICLE_SUBMITTED,
    UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.editor
});

const mapDispatchToProps = dispatch => ({
    onAddTag: () =>
        dispatch({type: ADD_TAG}),
    onRemoveTag: tag =>
        dispatch({type: REMOVE_TAG, tag}),
    onLoad: payload =>
        dispatch({type: EDITOR_PAGE_LOADED, payload}),
    onUnload: () => dispatch({type: EDITOR_PAGE_UNLOADED}),
    onSubmit: payload =>
        dispatch({type: ARTICLE_SUBMITTED, payload}),
    onUpdateField: (key, value) =>
        dispatch({type: UPDATE_FIELD_EDITOR, key, value})
});

class Editor extends React.Component {
    constructor() {
        super();

        const updateFieldEvent = key => ev =>
            this.props.onUpdateField(key, ev.target.value);

        this.changeTitle = updateFieldEvent('title');
        this.changeDescription = updateFieldEvent('description');
        this.changeBody = updateFieldEvent('body');
        this.changeTagInput = updateFieldEvent('tagInput');
        this.changeUrl = updateFieldEvent('url');

        this.watchForEnter = ev => {
            if (ev.keyCode === 13) {
                ev.preventDefault();
                this.props.onAddTag();
            }
        };

        this.removeTagHandler = tag => () => {
            this.props.onRemoveTag(tag);
        };

        this.submitForm = ev => {
            ev.preventDefault();
            const article = {
                title: this.props.title,
                description: this.props.description,
                url: this.props.url,
                body: this.props.body,
                tagList: this.props.tagList
            };

            const slug = {slug: this.props.articleSlug};
            const promise = this.props.articleSlug ?
                agent.Articles.update(Object.assign(article, slug)) :
                agent.Articles.create(article);

            this.props.onSubmit(promise);
        }

    }


    componentWillReceiveProps(nextProps) {
        if (this.props.params.slug !== nextProps.params.slug) {
            if (nextProps.params.slug) {
                this.props.onUnload();
                return this.props.onLoad(agent.Articles.get(this.props.params.slug));
            }
            this.props.onLoad(null);
        }
    }

    componentWillMount() {
        if (this.props.params.slug) {
            return this.props.onLoad(agent.Articles.get(this.props.params.slug));
        }
        this.props.onLoad(null);
    }

    componentWillUnmount() {
        this.props.onUnload();
    }


    render() {

        const urlField = (
            <fieldset>
                <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="url"
                    value={this.props.url}
                    onChange={this.changeUrl}
                />
            </fieldset>
        );


        return (
            <div className="editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <ListErrors errors={this.props.errors}/>
                            <form>
                                <fieldset>
                                    <fieldset>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Article Title"
                                            value={this.props.title}
                                            onChange={this.changeTitle}
                                        />
                                    </fieldset>
                                    { this.props.articleSlug ? null : urlField }

                                    <fieldset>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="What's this article about?"
                                            value={this.props.description}
                                            onChange={this.changeDescription}
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <textarea
                                            className="form-control form-control-lg"
                                            rows="8"
                                            placeholder="Write your article (in markdown)"
                                            value={this.props.body}
                                            onChange={this.changeBody}
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Tags (press enter)"
                                            value={this.props.tagInput}
                                            onChange={this.changeTagInput}
                                            onKeyUp={this.watchForEnter}
                                        />
                                    </fieldset>
                                    <div className="tag-list">
                                        {
                                            (this.props.tagList || []).map(tag => {
                                                return (
                                                    <span className="tag-default tag-pill" key={tag}>
                                                        <i className="ion-close-round"
                                                           onClick={this.removeTagHandler(tag)}>
                                                        </i>
                                                        {tag}
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>

                                    <button
                                        className="btn btn-lg pull-xs-right btn-primary"
                                        type="button"
                                        disabled={this.props.inProgress}
                                        onClick={this.submitForm}>
                                        Publish Article
                                    </button>

                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);