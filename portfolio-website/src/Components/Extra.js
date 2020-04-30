import React, { Component } from 'react'
import YouTube from 'react-youtube';

export class Extra extends Component {
    render() {
        const opts ={
            height: "185",
            width: "320",
            playerVars: {
                autoplay: 1,
            },
        };
        return (
            <div>
                <h2>Projects</h2>
                <div>
                    During my time as a student at UCSB, I have worked on a couple different projects.
                </div>
                <div className="projects">
                    <div>
                        <h3>GauchoEats Alexa Skill</h3>
                        <div>
                            Overview: An Alexa/Echo skill developed by Team Mapaches to provide continuous metrics of UC Santa Barbara affiliated Dining Halls in real time.
                        </div>
                    </div>
                    <div>
                        <h3>Naive Path Tracer</h3>
                        <div>
                            Overview: My partner and I created a naive path tracer and rendered an image of a room with different objects. 
                            Naive path tracing is a form of ray tracing in which a ray is cast from the camera to the scene. 
                            When the ray hits an object, the ray then bounces off the object at a random direction at most 90 degrees from the normal of the intersection point. 
                            The ray continues in a similar fashion until it reaches a maximum amount of bounces known as the depth. 
                            The color of the pixel is then calculated as the average of all the color values it collected from all the objects.
                        </div>
                        <div>
                            <YouTube videoId="zxGQOZqr91k" opts={opts} onReady={this._onReady}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    _onReady(event) {
        event.target.pauseVideo();
    }
}
export default Extra;