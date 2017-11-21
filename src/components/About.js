import React from 'react';
import { Link } from 'react-router';
//import '../css/LandingPage.css';
import appleLogo from '../img/applelogo.svg';
import mobileApp from '../img/mobileapp.svg';
import webApp from '../img/webapp.svg';


const About = props => {

    return (
        <div>
            <div className="cook template">
                <header className="header themecolor-purple themefont-neutral">
                    <div className="container-lrg">
                        <div className="col-12 spread">
                            <div>
                                <a className="logo">
                                    Launchaco
                                </a>
                            </div>
                            <div>
                                <a className="nav-link" href="#">
                                    Twitter
                                </a>
                                <a className="nav-link" href="#">
                                    Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="container-lrg flex">
                        <div className="col-5">
                            <h1 className="heading">
                                Instantly search domains, haasdfasdfndles and logotypes.
                            </h1>
                        </div>
                        <div className="col-7">
                            <h2 className="paragraph">
                                We're creating the best place to go when starting a new business or company. With
                                Launchaco you can instantly search domain names, social media handles, and see your logo
                                in beautiful logotypes.
                            </h2>
                            <div className="ctas">
                                <a className="ctas-button" href="">
                                    <img src={appleLogo}/>
                <span>
                  download on App Store
                </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="container-lrg">
                        <div className="centerdevices col-12">
                            <div className="computeriphone">
                                <div className="computer">
                                    <div className="mask">
                                        <img className="mask-img" src="img/webapp.svg"/>
                                    </div>
                                </div>
                                <div className="iphone">
                                    <div className="mask">
                                        <img className="mask-img" src={mobileApp}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <div className="feature1">
                <div className="container-sml">
                    <div className="col-12 text-center">
                        <h3 className="heading">
                            Brilliant Domain Names.
                        </h3>
                        <p className="paragraph">
                            Launchaco instantly shows you the most relevant domain names. Followed by hundreds of new
                            gtlds. Get your .gold domain name today!
                        </p>
                    </div>
                </div>
                <div className="container-lrg centerdevices col-12">
                    <div className="computeriphone">
                        <div className="computer">
                            <div className="mask">
                                <img className="mask-img" src="img/webapp.svg"/>
                            </div>
                        </div>
                        <div className="iphone">
                            <div className="mask">
                                <img className="mask-img" src="img/mobileapp.svg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="feature3">
                <div className="container-lrg flex">
                    <div className="col-4">
                        <b className="emoji">
                            🎓
                        </b>
                        <h3 className="subheading">
                            Brilliant Domain Names.
                        </h3>
                        <p className="paragraph">
                            Launchaco instantly shows you the most relevant domain names. Followed by hundreds of new
                            gtlds. Get your .gold domain name today!
                        </p>
                    </div>
                    <div className="col-4">
                        <b className="emoji">
                            😾
                        </b>
                        <h3 className="subheading">
                            Instant Handles
                        </h3>
                        <p className="paragraph">
                            Naming your brand has never been soooo easy! With Launchaco you can instantly search for
                            twitter, facebook, medium, and instagram handles.
                        </p>
                    </div>
                    <div className="col-4">
                        <b className="emoji">
                            🚀
                        </b>
                        <h3 className="subheading">
                            Gorgeous Logotypes
                        </h3>
                        <p className="paragraph">
                            We've hand travelled the depths of the internet to bring you gorgeous logotypes. Featuring
                            the beautiful fonts of Connary Fagen.
                        </p>
                    </div>
                </div>
            </div>
            <div className="feature5">
                <div className="container-sml text-center">
                    <div className="col-12">
                        <h3 className="heading">
                            Brilliant Domain Names.
                        </h3>
                    </div>
                </div>
                <div className="container-lrg flex">
                    <div className="col-5 centervertical">
                        <div className="steps">
                            <div className="emoji">
                                <b>
                                </b>
                            </div>
                            <h3 className="subheading">
                                Instant Handles
                            </h3>
                            <p className="paragraph">
                                Launchaco instantly shows you the most relevant domain names. Followed by hundreds of
                                new gtlds. Get your .gold domain name today!
                            </p>
                        </div>
                        <div className="steps">
                            <div className="emoji">
                                <b>
                                </b>
                            </div>
                            <h3 className="subheading">
                                Gorgeous Logotypes
                            </h3>
                            <p className="paragraph">
                                Naming your brand has never been soooo easy! With Launchaco you can instantly search for
                                twitter, facebook, medium, and instagram handles.
                            </p>
                        </div>
                        <div className="steps">
                            <div className="emoji">
                                <b>

                                </b>
                            </div>
                            <h3 className="subheading">
                                Insanely Fast
                            </h3>
                            <p className="paragraph">
                                We've hand travelled the depths of the internet to bring you gorgeous logotypes.
                                Featuring the beautiful fonts of Connary Fagen.
                            </p>
                        </div>
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-6">
                        <div className="sidedevices">
                            <div className="iphoneipad2">
                                <div className="iphone">
                                    <div className="mask">
                                        <img className="mask-img" src="img/mobileapp.svg"/>
                                    </div>
                                </div>
                                <div className="ipad">
                                    <div className="mask">
                                        <img className="mask-img" src="img/webapp.svg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="socialproof">
                <div className="container-sml">
                    <div className="flex text-center">
                        <div className="col-12">
                            <h4 className="subheading">
                                "What a time saver for startup founders...this can be one of the most awful and creative
                                sinkholes that a team goes through... Bravo for making this hellish process a little
                                better."
                            </h4>
                            <p className="paragraph">
                                Sean Howell - CEO @ Hornetapp
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="container-sml">
                    <div className="col-12 text-center">
                        <div>
                            <a className="nav-link">
                                Twitter
                            </a>
                            <a className="nav-link">
                                Facebook
                            </a>
                            <a className="nav-link">
                                Contact
                            </a>
                            <a className="nav-link">
                                TOS
                            </a>
                            <a className="nav-link">
                                Privacy
                            </a>
                        </div>
                        <br/>
                        <div>
                            <span>
                              © 2016 Compute Studios.
                            </span>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
};

export default About;