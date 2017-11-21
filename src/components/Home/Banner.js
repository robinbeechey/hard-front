import React from 'react';
import { Link } from 'react-router';

const Banner = ({ appName }) => {
    return (
        <div className="banner">
            <div className="container">
                <h1 className="logo-font">
                    {appName.toLowerCase()}
                </h1>
                <p>A place for discussion</p>
            </div>
        </div>
    )
};

export default Banner;