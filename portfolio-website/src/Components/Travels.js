import React, { Component } from 'react'
import { SRLWrapper } from "simple-react-lightbox"
import ScrollToTop from "react-scroll-up";
import colosseum_in from './images/europe1.jpg'
import switzerland from './images/europe2.jpg'
import trevi from './images/europe3.jpg'
import eiffel from './images/europe4.jpg'
import amsterdam from './images/europe5.jpg'
import venice_canals from './images/europe6.jpg'
import colosseum_out from './images/europe7.jpg'
import pisa from './images/europe8.jpg'
import venice from './images/europe9.jpg'
import notre_dame from './images/europe10.jpg'
import louvre from './images/europe11.jpg'
import london_eye from './images/europe12.jpg'

export class Travels extends Component {
    render() {
        return (
            <div>
                <div className="text">
                    One of my passions includes traveling around the world and visiting new places. Here are just a few photos I have taken from my trips to various countries in Europe.
                </div>
                <div>
                    <SRLWrapper className="travel-images">
                        <div ></div>
                        <a href={colosseum_in} data-attribute="SRL">
                            <img className="image" src={colosseum_in} alt="Inside the Roman Colosseum"/>
                        </a>
                        <a href={switzerland} data-attribute="SRL">
                            <img className="image" src={switzerland} alt="The Fields in Swizterland"/>
                        </a>
                        <a href={trevi} data-attribute="SRL">
                            <img className="image" src={trevi} alt="Trevi Fountain"/>
                        </a>
                        <a href={eiffel} data-attribute="SRL">
                            <img className="image eiffel" src={eiffel} alt="Eiffel Tower"/>
                        </a>
                        <a href={amsterdam} data-attribute="SRL">
                            <img className="image" src={amsterdam} alt="Iamsterdam sign"/>
                        </a>
                        <a href={venice_canals} data-attribute="SRL">
                            <img className="image" src={venice_canals} alt="Venice Canals"/>
                        </a>
                        <a href={colosseum_out} data-attribute="SRL">
                            <img className="image" src={colosseum_out} alt="Outside view of the Roman Colloseum"/>
                        </a>
                        <a href={pisa} data-attribute="SRL">
                            <img className="image" src={pisa} alt="Leaning Tower of Pisa"/>
                        </a>
                        <a href={venice} data-attribute="SRL">
                            <img className="image" src={venice} alt="Bridge in Venice"/>
                        </a>
                        <a href={notre_dame} data-attribute="SRL">
                            <img className="image" src={notre_dame} alt="Notre Dame"/>
                        </a>
                        <a href={louvre} data-attribute="SRL">
                            <img className="image" src={louvre} alt="Le Louvre"/>
                        </a>
                        <a href={london_eye} data-attribute="SRL">
                            <img className="image" src={london_eye} alt="The London Eye"/>
                        </a>
                    </SRLWrapper>
                </div>
                <div>
                    <ScrollToTop showUnder={160}>
                        <span>Back To Top</span>
                    </ScrollToTop>
                </div>
                
            </div>
        )
    }
}

export default Travels;