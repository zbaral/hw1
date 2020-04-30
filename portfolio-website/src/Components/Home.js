import React, { Component } from 'react'
import Self from './images/me.jpg'

export class Home extends Component {
    render() {
        return (
            <div className="home-page">
                <div className="self-image">
                    <img src={Self}/>
                </div>
                <div className="text">
                        Hi! My name is Zoe Baral and I am a 4th year undergrad student at UCSB studying computer science.
                        Feel free to take a look around my website, however, keep in mind that it is a work in progress,
                        so you might not find much yet. :\
                </div>
            </div>
        )
    }
}

export default Home; 