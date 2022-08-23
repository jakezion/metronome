import React from 'react';
import ReactDOM from 'react-dom';
import TempoButton from "./Components/Button";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import './styles/styles.css'

class App extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (

            <div className="container">
                <div className="wrapper">
                <Navbar/>
                {/*<h1>Metronome</h1>*/}
                    <div className="metro">
                <TempoButton/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

ReactDOM.render(<React.StrictMode><App/></React.StrictMode>, document.getElementById('root'));