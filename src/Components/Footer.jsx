import {IoLogoGithub} from "react-icons/io5";
import React from "react";

//basic footer with link to github repository
export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <a href="https://github.com/jakezion/metronome/" target="_blank" rel="noreferrer">
                    <div className="footer-details">
                   <IoLogoGithub className="icons"/>&nbsp;Github repository&nbsp;</div></a>

            </footer>
        );
    }


}