import React from 'react';

const Footer = ({ appName }) => {
    return (
        <div className="footer-container">
            <div className="container footer-tag">
                <p className="logo-font">
                    {appName.toLowerCase()}
                </p>
                <p> - an app made by <a target="blank" href="https://www.robinbeechey.com">Robin Beechey</a></p>
            </div>
        </div>
    )
};

export default Footer;