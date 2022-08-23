import React from 'react';
import ReactDOM from 'react-dom';
import {IoLogoGithub} from "react-icons/io5";
import TempoButton from "./Components/Button";
import Navbar from "./Components/Settings";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
    }


    toggleSettings() {
        this.setState((state) => ({opened: state.opened === true}));
    }

    render() {
        return (
            <div className="container">
                <Navbar/>
                <TempoButton/>
                <footer>
                    <a href="https://github.com/jakezion/metronome/" target="_blank" rel="noreferrer">
                        <IoLogoGithub/>&nbsp;Github repository&nbsp;</a>
                </footer>
            </div>
        );
    }
}

ReactDOM.render(<React.StrictMode><App/></React.StrictMode>, document.getElementById('root'));