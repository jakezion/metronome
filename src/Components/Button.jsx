import React from 'react';
import {IoMusicalNote, IoRefresh, IoPause, IoPlay, IoRemove, IoAdd} from "react-icons/io5";

//sets initial state of the counter, and timestamps for inital and current taps


//class for updating and reseting the current bpm
export default class TempoButton extends React.Component {
    constructor(props) {
        super(props);

    }


    //renders the buttons and the calculatebpm class (includes the logic for calculation of bpm)
    //returns current bpm after 4 taps of button and displays it to the user
    render() {

        return (

            <>
                <div className="button-bar">
                    <div className="value-label">
                        {
                            this.props.countTap >= 4 ?
                                <span id="value-label">{this.props.bpm}</span> : <></>
                        }
                        <span className="bpm-label">&nbsp;bpm</span>

                    <div className="tempo-label">{this.props.beatsPerBar}/4</div>
                    </div>
                    <div className="button-group">


                        <Settings
                            beatsPerBar={this.props.beatsPerBar}
                            onClick={this.props.onClick}
                            updateTap={this.props.updateTap}
                        />




                    </div>
                    <div className="button-group">


                        <PlayButton hasStarted={this.props.hasStarted} onClick={this.props.onClick}/>
                        <button onClick={this.props.resetTap} className="reset"
                                disabled={this.props.countTap <= 0}>
                            <IoRefresh/>
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

//variable controller for increasing/decreasing the number of beats per measure
//between 2-12 beats
function Settings(props) {
    console.log("brat: " + props.beatsPerBar);
    return (

        <>
            <button
                name={"decrement-tempo"}
                onClick={props.onClick}
                className="btn-circle"
            ><IoRemove/>
            </button>


            <button onClick={props.updateTap} className="tap-tempo"><IoMusicalNote/></button>
            <button
                name={"increment-tempo"}
                onClick={props.onClick}
                className="btn-circle"
            ><IoAdd/>
            </button>
        </>

    )
}

//pause and play button for the audio and visualiser
function PlayButton(props) {

    return (
        <>

            <button className="reset" onClick={props.onClick} name="play-button">
                {props.hasStarted === true ? <IoPause className="plus-minus" /> : <IoPlay/>}
            </button>
        </>
    );
}



