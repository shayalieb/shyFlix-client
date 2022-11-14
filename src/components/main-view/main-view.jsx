import React from "react";
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import { Button } from "react-bootstrap";

import axios from "axios";//For importing my data

//need to import registration-view
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registeration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
// import { MainView } from './components/main-view/main-vie
import './main-view.scss'


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

    //When the movie is clicked, the function is invoked and updates the state to that movie
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
        const { movies, selectedMovie, user } = this.state;

        if (!user)
            return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />

        if (movies.length === 0) return <div className="main-view" />

        return (
            <Row className="main-view justify-content-md-center">
                {selectedMovie ? (
                    <Col md={8}>
                        <MovieView
                            movie={selectedMovie}
                            onBackClick={(newSelectedMovie) => {
                                this.setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    </Col>
                ) : (
                    movies.map((movie) => (
                        <Col md={3}>
                            <MovieCard
                                key={movie._id}
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    this.setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))
                )}
            </Row>
        );
    }
}

export default MainView;