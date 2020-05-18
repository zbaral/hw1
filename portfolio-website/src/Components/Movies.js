import React, { Component } from 'react'
import { SRLWrapper } from "simple-react-lightbox"
import ScrollToTop from "react-scroll-up";
import axios from 'axios'

const baseURL = "https://www.omdbapi.com/?apikey=90527508&i="
var imdbIDs = ["tt0245429", "tt0266697", "tt0167404", "tt0114369", 
"tt5323662", "tt0120669", "tt3281548", "tt0457430", "tt0137523", 
"tt0110357", "tt0338013", "tt5052448", "tt0096283", "tt0110912", 
"tt0119116", "tt0268978", "tt0347149", "tt0086250", "tt0286106",
"tt0241527", "tt0120737", "tt0120855", "tt2267998", "tt1375666",
"tt0446029"]

export class Movies extends Component {

    state = {
        isLoading: true,
        movies: []
    };

    componentDidMount() {
        axios.all([
            axios.get(baseURL + imdbIDs[0]),
            axios.get(baseURL + imdbIDs[1]),
            axios.get(baseURL + imdbIDs[2]),
            axios.get(baseURL + imdbIDs[3]),
            axios.get(baseURL + imdbIDs[4]),
            axios.get(baseURL + imdbIDs[5]),
            axios.get(baseURL + imdbIDs[6]),
            axios.get(baseURL + imdbIDs[7]),
            axios.get(baseURL + imdbIDs[8]),
            axios.get(baseURL + imdbIDs[9]),
            axios.get(baseURL + imdbIDs[10]),
            axios.get(baseURL + imdbIDs[11]),
            axios.get(baseURL + imdbIDs[12]),
            axios.get(baseURL + imdbIDs[13]),
            axios.get(baseURL + imdbIDs[14]),
            axios.get(baseURL + imdbIDs[15]),
            axios.get(baseURL + imdbIDs[16]),
            axios.get(baseURL + imdbIDs[17]),
            axios.get(baseURL + imdbIDs[18]),
            axios.get(baseURL + imdbIDs[19]),
            axios.get(baseURL + imdbIDs[20]),
            axios.get(baseURL + imdbIDs[21]),
            axios.get(baseURL + imdbIDs[22]),
            axios.get(baseURL + imdbIDs[23]),
            axios.get(baseURL + imdbIDs[24])
        ])
        .then(responseArr => {
            console.log(responseArr[0].data);
            console.log(responseArr[1].data);
            console.log(responseArr[2].data);
            console.log(responseArr[3].data);
            console.log(responseArr[4].data);
            console.log(responseArr[5].data);
            console.log(responseArr[6].data);
            console.log(responseArr[7].data);
            console.log(responseArr[8].data);
            console.log(responseArr[9].data);
            console.log(responseArr[10].data);
            console.log(responseArr[12].data);
            console.log(responseArr[13].data);
            console.log(responseArr[14].data);
            console.log(responseArr[15].data);
            console.log(responseArr[16].data);
            console.log(responseArr[17].data);
            console.log(responseArr[18].data);
            console.log(responseArr[19].data);
            console.log(responseArr[20].data);
            console.log(responseArr[21].data);
            console.log(responseArr[22].data);
            console.log(responseArr[23].data);
            console.log(responseArr[24].data);
            const movieArr = [responseArr[0].data, 
                responseArr[1].data, 
                responseArr[2].data,
                responseArr[3].data,
                responseArr[4].data,
                responseArr[5].data,
                responseArr[6].data,
                responseArr[7].data,
                responseArr[8].data,
                responseArr[9].data,
                responseArr[10].data,
                responseArr[12].data,
                responseArr[13].data,
                responseArr[14].data,
                responseArr[15].data,
                responseArr[16].data,
                responseArr[17].data,
                responseArr[18].data,
                responseArr[19].data,
                responseArr[20].data,
                responseArr[21].data,
                responseArr[22].data,
                responseArr[23].data,
                responseArr[24].data
            ]

            this.setState({
                movies: movieArr,
                isLoading: false
            });
        })
    }

    render(){
        const {isLoading, movies} = this.state;
        return (
            <div>
                <SRLWrapper>
                    <div className = "movies">
                    {!isLoading ? (
                    movies.map(movie => {
                        return (
                            <div className="movie" key={movie.Title}>
                                <a href={movie.Poster} data-attribute="SRL">
                                    <img src={movie.Poster} alt={movie.Title + "\n..... Directed by: " + movie.Director + "\n..... IMDB rating: " + movie.imdbRating} />
                                </a>
                            </div>
                        );
                    })
                    ) : (
                        <span>Loading...</span>
                        )
                    }
                    </div>
                </SRLWrapper>
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