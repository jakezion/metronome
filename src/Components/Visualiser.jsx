import React from 'react';

//visualise circles to show current beat
export default class Visualiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastBeat: null,
            currentBeat: null,
            circles: [],
        }

        this.display = null;
        this.loopAnimation = this.loopAnimation.bind(this);
    }

    //https://reactjs.org/docs/react-component.html
    componentDidMount() {
        requestAnimationFrame(this.loopAnimation);
    }

    //on off focus, cancel animations to save memory
    componentWillUnmount() {
        cancelAnimationFrame(requestAnimationFrame(this.loopAnimation));
    }

    //display changes to circle when current beat is the same as the position in beatsPerMeasure
    visualiseBeat() {

        let circle = [];
        //for each beats per measure add a circle
        for (let i = 0; i < this.props.beatsPerMeasure; i++) {

            //add to circle array for state changes
            circle.push(<Circle key={i}/>);


            //if current beat is the same value then set display (will display the current note)
            if (this.state.currentBeat?.beat === i) {
                this.display = this.state.currentBeat;

            }


            //if current beat has been set then display a filled circle, if paused, do not.
            // ? to make sure this only run if it exists to avoid errors
            if (this.display?.beat === i) {

                if (this.props.hasStarted) {

                    circle.splice(i, 1, <Circle key={i} class="fill"/>);

                } else {
                    this.display = null;
                }
            }

            //set circles array to current array
            this.setState({circles: circle})
        }

    }

    //infinite loop checking for beat updates, until either paused on unmounted
    loopAnimation() {

        this.visualiseBeat();

        if (this.props.hasStarted) {

            //current time based on audio context, current beat and its queue
            let time = this.props.ac.currentTime;
            let queue = this.props.queue;
            let current = this.state.lastBeat;

            //while length and 0 position time value is less than the current time
            while (queue.length && queue[0].time < time) {
                //pops element 0 from queue
                current = queue[0];
                queue.splice(0, 1);

            }

            //set new current beat
            this.setState(() => ({
                currentBeat: current
            }));


        }

        //https://developer.mozilla.org/en-US/docs/Web/Performance/CSS_JavaScript_animation_performance
        //better alternative to setInterval
        requestAnimationFrame(this.loopAnimation);

    }

    render() {
        return (
            <>
                <div className="visualiser">
                    {this.state.circles}
                </div>

            </>
        );

    }
}

function Circle(props) {
    //renders new div with dynamically changing classes for when a beat is currently being played
    return (
        <>
            <div className={`circle ${props.class}`}/>
        </>
    );

}



