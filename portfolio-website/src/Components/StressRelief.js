import React, { Component } from 'react'
import YouTube from 'react-youtube';

export class StressRelief extends Component {
    render() {
        const opts ={
            height: "390",
            width: "640",
            playerVars: {
                autoplay: 1,
            },
        };
        return (
            <div className="stress-page">
                <div className="text">
                    As we all know, this a stressful time for most people. Some ways I chose to relieve some of that 
                    stress is through watching Netflix or if I'm feeling more productive, I like to put on a workout video and *try* to follow along.
                    Here is a yoga video that I often like to follow when I'm feel especially overwhelmed.
                </div>
                <div>
                    <YouTube videoId="hJbRpHZr_d0" opts={opts} onReady={this._onReady}/>
                </div>
                
            </div>
        )
    }
    _onReady(event) {
        event.target.pauseVideo();
    }
}
export default StressRelief;