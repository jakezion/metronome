import React from 'react';
import {IoMusicalNote, IoPause, IoPlay, IoRemove, IoAdd, IoReload} from "react-icons/io5";

//class for updating and resetting the current bpm
export default class TempoButton extends React.Component {
    constructor(props) {
        super(props);

    }


    //renders the buttons and then calculate bpm class (includes the logic for calculation of bpm)
    //returns current bpm after 4 taps of button and displays it to the user
    render() {
        return (
            <>
                <div className="button-row">
                    <div className="bpm-value">
                        {this.props.countTap >= 4 ? <span>{this.props.bpm}</span> : <></>}
                        <span className="bpm-label">&nbsp;bpm</span>

                        <div className="tempo-label">{this.props.beatsPerMeasure}/4</div>
                    </div>
                    <div className="button-group">
                        <Settings
                            beatsPerMeasure={this.props.beatsPerMeasure}
                            onClick={this.props.onClick}
                            updateTap={this.props.updateTap}
                        />
                    </div>
                    <div className="button-group">
                        <PlayButton hasStarted={this.props.hasStarted} onClick={this.props.onClick}/>
                        <button onClick={this.props.resetTap} className="circle-button"
                                disabled={this.props.countTap <= 0}>
                            <IoReload className="button-icon"/>
                        </button>
                    </div>
                </div>
            </>);
    }
}

//variable controller for increasing/decreasing the number of beats per measure
//between 2-12 beats
function Settings(props) {
    return (

        <>
            <button
                name={"decrement-tempo"}
                onClick={props.onClick}
                className="hollow-button"
            ><IoRemove className="button-icon"/>
            </button>

            <button onClick={props.updateTap} className="tempo-button">
                <IoMusicalNote className="button-icon"/>
            </button>

            <button
                name={"increment-tempo"}
                onClick={props.onClick}
                className="hollow-button"
            ><IoAdd className="button-icon"/>
            </button>
        </>

    )
}

//pause and play button for the audio and visualiser
//TODO add disabled if clicks are less than 4
function PlayButton(props) {

    return (
        <>
            <button className="circle-button" onClick={props.onClick} name="play-button">
                {props.hasStarted === true ? <IoPause className="button-icon"/> :
                    <IoPlay className="button-icon"/>}
            </button>
        </>
    );
}



