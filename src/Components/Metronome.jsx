import React, {useEffect} from 'react';
import TempoButton from "./Button";
import Visualiser from "./Visualiser";

export default class Metronome extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            //play audio
            hasStarted: false,
            beginAudio: false,
            interval: null,

            //assign next beat timing
            beatQueue: [],
            nextBeat: 0,
            nextBeatInterval: 0,
            nextClick: 0,
            nextClickInterval: 0,
            beatsPerMeasure: 4,
            clicksPerBeat: 1,

            //for tap tempo button
            bpm: null,
            countTap: 0,
            initialTap: null,
            currentTap: null,

        };

        //https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext
        this.ac = new AudioContext({sampleRate: 44100});
        this.startAudio();

    }

    //updates the tapcount by 1, initialises the initial tap and gets the current tap after each press
    updateTap(event) {
        this.setState({
            countTap: this.state.countTap + 1,
            initialTap: this.state.initialTap || event.timeStamp,
            currentTap: event.timeStamp
        })
        this.calculateBPM();

    }

    //calculates bpm using maths found from:
    //https://guitargearfinder.com/guides/convert-ms-milliseconds-bpm-beats-per-minute-vice-versa/
    calculateBPM() {
        if (this.state.countTap >= 3) {
            //timeStamp produces current time in ms so everything seconds need to be *1000 to work in ms
            this.difference = (this.state.currentTap - this.state.initialTap);
            this.average = this.difference / (this.state.countTap - 1);
            //60s (1min == 60s) * 1000ms (1s == 1000ms) / average gives number of beats per minute
            this.bpm = Math.round((60 * 1000) / this.average);
            this.setState({bpm: this.bpm});

        }

    }

    //reset tap data back to defaults
    resetTap() {
        /*   this.ac.close();*/
        clearInterval(this.state.interval);
        this.setState(state => ({}));
        this.setState({
            bpm: 0,
            countTap: 0,
            initialTap: null,
            currentTap: null,
            hasStarted: false,
            beginAudio: false,
            beatQueue: [],
            nextClickInterval: 0,
            nextBeat: 0,
            nextClick: 0
        });

    }

    createNote(note) {

        switch (this.props.audioType) {
            case 1:
                let oscillator = this.ac.createOscillator();
                //settings gain to 10%
                let gain = this.ac.createGain();
                oscillator.type = 'triangle';
                oscillator.connect(gain).connect(this.ac.destination);
                gain.gain.value = 0.05;
                oscillator.start(this.state.nextClickInterval);

                //stop after 0.1s or 100ms
                oscillator.stop(this.state.nextClickInterval + 0.05);
                // if note is 1st in queue, play lower frequency to distinguish difference in sounds
                // https://www.acousticslab.org/psychoacoustics/PMFiles/Module05.htm for music theory reference
                oscillator.frequency.value = note.beat !== 0 ? 220.0 : 440.0;
                break;
            case 2:
                //if bpm == 0 dont play sound
                if (this.state.bpm !== null) {

                    let bit = (note.beat !== 0) ? 'https://cdn.freesound.org/previews/159/159376_2874984-lq.mp3' : 'https://cdn.freesound.org/previews/273/273766_3554699-lq.mp3';
                    this.playCustomSound(bit);

                }
                break;
            case 3:
                if (this.state.bpm !== null) {

                    let drum = (note.beat !== 0) ? 'https://cdn.freesound.org/previews/68/68609_19778-lq.mp3' : 'https://cdn.freesound.org/previews/61/61564_321967-lq.mp3';
                    this.playCustomSound(drum);

                }
                break;
            default:
                break;
        }


    }

    //play custom sound from url, add to a buffer stream, then play sound for 50ms
    playCustomSound(url) {
        fetch(url)
            .then(resp => resp.arrayBuffer())
            .then(arrayBuffer => this.ac.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                const sound = this.ac.createBufferSource();
                sound.buffer = audioBuffer;
                let gain = this.ac.createGain();
                sound.connect(gain).connect(this.ac.destination);
                gain.gain.value = 0.05;
                sound.start(this.state.nextClickInterval);
                sound.stop(this.state.nextClickInterval + 0.05);
            })
    }

    queueNote() {
        //only tick if audio has started
        if (this.state.hasStarted === false) return;

        //while next click is less than current time + buffer get next beat
        if (this.state.bpm !== 0) {
            while (this.state.nextClickInterval < this.ac.currentTime + 0.1) {

                let nextBeat = this.state.nextBeat;
                let nextClick = this.state.nextClick;
                //get frequency of beats per second e.g. 120 bpm == every 0.5s
                let beatInterval = 60.0 / this.state.bpm;
                let nextBeatInterval = this.state.nextBeatInterval;

                //make new note
                let nextNote = new Beat(this.state.nextClickInterval, nextBeat, nextClick);
                if (nextNote.click === 0) {
                    nextBeatInterval = nextNote.time + beatInterval;
                }
                //make noise for short interval then stop oscillator
                this.createNote(nextNote);

                nextBeat++;
                nextClick = 0;
                if (nextBeat >= this.state.beatsPerMeasure) {
                    nextBeat = 0;

                }

                //combines state with new note and creates new array
                this.setState((state) => {
                    const queue = state.beatQueue.concat(nextNote);

                    return {
                        beatQueue: queue,
                        nextClickInterval: state.nextClickInterval + 1 / this.state.clicksPerBeat * beatInterval,
                        nextBeatInterval: nextBeatInterval,
                        nextBeat: nextBeat,
                        nextClick: nextClick
                    };
                });
            }
        }

    }


//create bufferSource and start at current time
    startAudio() {
        this.ac.createBufferSource().buffer = this.ac.createBuffer(
            1,
            1,
            22050
        );
        this.ac.createBufferSource().start(this.ac.currentTime);
    }

// updates hasStarted, increment/decrement of beats per measure,
// re-inits audiocontext when unpaused to avoid sound overlapping
    handleClick(event) {

        if (event.target.name === "decrement-tempo") {
            if (this.state.beatsPerMeasure > 2) {
                this.setState({beatsPerMeasure: this.state.beatsPerMeasure - 1});

            }
            return;
        }

        if (event.target.name === "increment-tempo") {
            if (this.state.beatsPerMeasure < 12) {
                this.setState({beatsPerMeasure: this.state.beatsPerMeasure + 1});
            }
            /*   else if (this.state.beatsPerMeasure === 12){
                   this.setState(incrementButton: !(use))
               }*/
            return;
        }

        //closes ac and resets state data back to default to wipe queue
        if (event.target.name === "play-button") {

            if (this.state.hasStarted) {
                this.ac.close();
                clearInterval(this.state.interval);
                this.setState(state => ({
                    hasStarted: !state.hasStarted,
                    beginAudio: false,
                    beatQueue: [],
                    nextClickInterval: 0,
                    nextBeat: 0,
                    nextClick: 0
                }));
            } else {
                //re-init ac
                this.ac = new AudioContext({sampleRate: 44100});

                if (!this.state.beginAudio) {
                    this.startAudio();
                }

                this.setState(state => ({
                    hasStarted: !state.hasStarted,
                    beginAudio: true
                }));

                this.interval = setInterval(() => this.queueNote(), 25);
            }
        }
    }


    render() {
        return (
            <>

                dfasljfasd
             {/*   <Visualiser
                    hasStarted={this.state.hasStarted}
                    queue={this.state.beatQueue}
                    ac={this.ac}
                    beatsPerMeasure={this.state.beatsPerMeasure}
                    bpm={this.state.bpm}
                />*/}

                <TempoButton
                    beatsPerMeasure={this.state.beatsPerMeasure}
                    onClick={this.handleClick.bind(this)}
                    hasStarted={this.state.hasStarted}
                    updateTap={this.updateTap.bind(this)}
                    resetTap={this.resetTap.bind(this)}
                    countTap={this.state.countTap}
                    bpm={this.state.bpm}
                />
            </>
        );
    }
}

//beat class for an individual note, creates new instance of time, beat and click for each beat.
class Beat {
    constructor(time = 0, beat = 0, click = 0) {
        this.time = time;
        this.beat = beat;
        this.click = click;
    }
}