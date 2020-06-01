import React, { useEffect, useState, Component } from 'react'
import config from './config.js'
import axios from 'axios'

const firebase = require('firebase')

const baseURL = "https://www.omdbapi.com/?apikey=90527508&i="

class AddMovie extends Component {
    constructor(){
        super();
        this.state = {
            movieID: '',
            movieInfo: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
    }
    componentDidUpdate(prevProps, prevState, snapshoyt){
        //only call set state here if it is wrapped in a condition
        //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
        if(this.state.shouldUpdate != prevState.shouldUpdate){
            firebase.initializeApp(config)
            let info = []
            axios.get(baseURL + this.state.movieID)
            .then(response => {
                console.log(response.data)
                info = (response.data)
            })
            this.setState({
                movieID: this.state.movieID,
                movieInfo: info
            })
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const idRef = firebase.database().ref('movieIDs')
        console.log(baseURL + this.state.movieID)
        axios.get(baseURL + this.state.movieID)
        .then(response => {
            console.log(response.data)
            this.setState({
                movieInfo: response.data
            })
            const id = {
                movieID: this.state.movieID,
                movieInfo: this.state.movieInfo
            }
            idRef.push(id)
        })
        this.setState({
            movieID: '',
            movieInfo: []
        })
    }
    
    render() {
    return(
        <div className="add_movie">
            <h1>Add a New Movie</h1>
            <div className="add-movie-body">
                <div classname="addEntry">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Please enter the IMDB id: </h3>
                        <input 
                            type="text" 
                            name="movieID"
                            value={this.state.movieID}
                            required 
                            minLength="6"
                            maxLength="19"
                            placeholder="imdb id" 
                            onChange={this.handleChange}
                        />
                        <button>Add Movie</button>
                    </form>
                </div>
            </div>
        </div>
    );
    }
}
export default AddMovie;