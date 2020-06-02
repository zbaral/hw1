import React, { Component } from 'react'
import { SRLWrapper } from "simple-react-lightbox"
import ScrollToTop from "react-scroll-up";
import config from './config.js'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
const firebase = require('firebase')

// var imdbIDs = ["tt0245429", "tt0266697", "tt0167404", "tt0114369", 
// "tt5323662", "tt0120669", "tt3281548", "tt0457430", "tt0137523", 
// "tt0110357", "tt0338013", "tt5052448", "tt0096283", "tt0110912", 
// "tt0119116", "tt0268978", "tt0347149", "tt0086250", "tt0286106",
// "tt0241527", "tt0120737", "tt0120855", "tt2267998", "tt1375666",
// "tt0446029"]

export class Movies extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: true,
            movies: [],
            lists: [],
            show: false
        }
        this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
        let listRef = firebase.database().ref('listNames')
        listRef.on('value', snapshot => {
            const list = snapshot.val()
            let newState = []
            for(let name in list){
                newState.push(
                    list[name])
            }            
            this.setState({
                lists: newState
            })
        })
        let ref = firebase.database().ref('movieIDs')
        ref.on('value', snapshot => {
            const movies = snapshot.val()
            let newState = []
            for(let movie in movies){
                newState.push({
                    id: movie.movieID,
                    title: movies[movie].movieInfo.Title,
                    poster: movies[movie].movieInfo.Poster,
                    director: movies[movie].movieInfo.Director,
                    rating: movies[movie].movieInfo.imdbRating
                })
            }            
            this.setState({
                movies: newState,
                isLoading: false
            })
        })
    }

    handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}
    // handleList(name){
    //     let newState = []
    //     for(let movie in name){
    //         newState.push({
    //             id: movie.movieID,
    //             title: name[movie].movieInfo.Title,
    //             poster: name[movie].movieInfo.Poster,
    //             director: name[movie].movieInfo.Director,
    //             rating: name[movie].movieInfo.imdbRating
    //         })
    //     }
    //     this.setState({
    //         movies: newState,
    //         isLoading: false
    //     })
    // }

    render(){
        const {isLoading, movies, lists} = this.state;
        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Lists
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown">
                        {lists.map(name => {
                            return (
                                <div>{name.name}</div>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                    <div className = "movies">
                        {!isLoading ? (
                            movies.map(movie => {
                                return (
                                    <div className="movie" key={movie.movieID}>
                                        <button variant="primary" onClick={this.handleShow}>
                                            <img src={movie.poster}/>
                                        </button>

                                        <Modal show={this.state.show} onHide={this.handleClose} className="modal">
                                            <Modal.Header closeButton className="modal-header">
                                                <Modal.Title>{movie.title}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body><img src={movie.poster}/></Modal.Body>
                                            <Modal.Body>Director: {movie.director}</Modal.Body>
                                            <Modal.Footer>
                                                <button variant="secondary" onClick={this.handleClose}>
                                                        Close
                                                </button>
                                                <button variant="primary" onClick={this.handleClose}>
                                                        Save Changes
                                                </button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                );
                            })
                        ) : (
                            <span>Loading...</span>
                            )
                        }
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

export default Movies;

/* 
memento
shutter island
ex machina
the sixth sense
the matrix
gone girl
the truman show
fight club
se7en
inception
eternal sunshine of the spotless mind
hereditary
signs
get out
interstellar
pan's labyrinth
a beautiful mind
a clockwork orange
fear and loathing in las vegas
harry potter
star wars
totoro
howls moving castle
a silent voice
spirited away
lord of the rings
scarface
kill bill
pulp fiction
the fifth element
little women
the lion king
tarzan
marvel movies

*/