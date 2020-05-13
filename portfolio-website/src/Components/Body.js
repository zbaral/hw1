 import React, { Component } from 'react'
 import Home from './Home'
 import Travels from './Travels'
 import StressRelief from './StressRelief'
 import Extra from './Extra'
 import GuestBook from './GuestBook'
 import Movies from './Movies'
 import SimpleReactLightbox from "simple-react-lightbox";
 
 export class Body extends Component {
     displayContent = () => {
         var activeTab = this.props.activeTab
         if(activeTab == 1){
             return <Home/>
         }else if(activeTab == 2){
             return <SimpleReactLightbox>
                        <Travels/>
                    </SimpleReactLightbox>
         }else if(activeTab == 3){
             return <StressRelief/>
         }else if(activeTab == 4){
             return <Extra/>
         }else if(activeTab == 5){
             return <GuestBook/>
         }else return <Movies/>
     }
     render() {
         return (this.displayContent());
     }
 }
 
 export default Body;