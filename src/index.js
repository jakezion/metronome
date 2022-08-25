import './styles/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import TempoButton from "./Components/Button";
import Metronome from "./Components/Metronome";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            audioType: 1,
        }
    }

    onClick(event) {
        if (event.target.name === 'beep') {

            this.setState({audioType: 1})
        } else if (event.target.name === 'bit') {

            this.setState({audioType: 2})
        } else if (event.target.name === 'drum') {

            this.setState({audioType: 3})
        }

    }

    render() {
        return (

            <>
                <div className="container">
                    <div className="wrapper">
                        <Navbar
                            audioType={this.state.audioType}
                            onClick={this.onClick.bind(this)}
                        />
                        <div className="main">
                            <Metronome
                                audioType={this.state.audioType}
                            />
                        </div>
                    </div>
                    <Footer/>
                </div>
            </>
        );
    }
}

ReactDOM.render(<React.StrictMode><App/></React.StrictMode>, document.getElementById('root'));