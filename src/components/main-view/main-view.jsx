import React from "react";
import axios from "axios";//For importing my data

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
// import { MainView } from './components/main-view/main-vie
import '../../index.scss'

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://shyflixapp.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //When this function is clicked it updates the state of the selected movie, and you can select the movie
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        })
    }

    //Logs in the user and updates the state to the particular user
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;
        //If there is no user, the login view is redered. If there is a user logged in the user details are passed
        if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
        //Check before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />

        return (
            <div className="main-view">
                {selectedMovie //Is selected movie state is not null, sellectedMovie movie will be returned
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
            </div>
        );
    }

}

export default MainView;
