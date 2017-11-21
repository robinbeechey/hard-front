import React from 'react';

class SuccessMessage extends React.Component {
    render() {

        const message = this.props.message;
        if (message) {
            return (
                <ul className="success-message">
                    <li>{message}</li>
                </ul>
            );

        } else {
            return null;
        }

    }
}

export default SuccessMessage;