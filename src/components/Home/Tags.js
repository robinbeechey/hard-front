import React from 'react';
import agent from '../../agent';
import Spinner from '../Spinner';


const Tags = props => {
    const tags = props.tags;


    if (tags) {
        const size = 5;
        const tagMap = tags.slice(0, size).map(tag => {
            const handleClick = ev => {
                ev.preventDefault();
                props.onClickTag(tag, agent.Articles.byTag(tag));
            };

            return (
                <a
                    href=""
                    className="tag-default tag-pill"
                    key={tag}
                    onClick={handleClick}>
                    {tag}
                </a>
            )
        });

        window.tagMap = tagMap;

        return (
            <div className="tag-list">
                {tagMap}
                {tags.length > 5 ?
                    (
                        <span href=""
                            className="tag-default tag-pill">
                            &nbsp;+&nbsp;
                        </span>
                    ) :
                    null
                }
            </div>
        )
    } else {
        return (
            <Spinner />
        )
    }


};

export default Tags;