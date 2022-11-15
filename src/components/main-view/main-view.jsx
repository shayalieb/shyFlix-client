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
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    //When the movie is clicked, the function is invoked and updates the state to that movie
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    //Logs in the user and updates the state to the particular user
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username)
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get('https://shyflixapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                //resulsts will be assinged to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
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
                <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
            </Row>
        );
    }
}

export default MainView;