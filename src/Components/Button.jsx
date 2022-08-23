import React from 'react';
import {IoMusicalNoteSharp} from "react-icons/io5";

//sets initial state of the counter, and timestamps for inital and current taps
const initialState = {
    countTap: 0,
    initialTap: null,
    currentTap: null
}

//class for updating and reseting the current bpm
export default class TempoButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    //updates the tapcount by 1, initialises the initial tap and gets the current tap after each press
    updateTap(event) {
        this.setState({
            countTap: ++this.state.countTap || 0,
            initialTap: this.state.initialTap || event.timeStamp,
            currentTap: event.timeStamp
        })
    }

    //resets values back to default
    resetTap(event) {
        this.setState(initialState);
    }

    //renders the buttons and the calculatebpm class (includes the logic for calculation of bpm)
    render() {
        const stateData = {
            countTap: this.state.countTap,
            initialTap: this.state.initialTap,
            currentTap: this.state.currentTap
        };

        return (
            <>
                <CalculateBPM stateData={stateData}/>
                <div className="button-group">
                    <button onClick={this.updateTap.bind(this)} className="tap-tempo"><IoMusicalNoteSharp/></button>
                    <button onClick={this.resetTap.bind(this)} className="reset" disabled={this.state.countTap <= 0}>
                        Reset bpm
                    </button>
                </div>
            </>
        );
    }
}

//calculates bpm using maths found from:
//https://guitargearfinder.com/guides/convert-ms-milliseconds-bpm-beats-per-minute-vice-versa/
//returns current bpm after 4 taps of button and displays it to the user
class CalculateBPM extends React.Component {


    calculateBPM() {
        //timeStamp produces current time in ms so everything seconds need to be *1000 to work in ms
        let difference = (this.props.stateData.currentTap - this.props.stateData.initialTap);
        let average = difference / (this.props.stateData.countTap - 1);
        //60s (1min == 60s) * 1000ms (1s == 1000ms) / average gives number of beats per minute
        return Math.round((60 * 1000) / average);
    }

    //testing with 4 taps minimum
    render() {
        return (
            <div className="value-label">
                {
                    this.props.stateData.countTap >= 4 ?
                    <span id="value-label">{this.calculateBPM()}</span> : <span>&nbsp;</span>
                }
                <span className="bpm-label">&nbsp;bpm</span>
            </div>
        );
    }
}
