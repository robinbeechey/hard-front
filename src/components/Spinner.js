import React from 'react';

const Spinner = props => {
    const inProgress = props.inProgress;
    if (inProgress) {
        return (
            <div className="loading-pulse"></div>
        )
    } else {
        return null;
    }

};

export default Spinner;