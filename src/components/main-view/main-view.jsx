import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
//Import the various views
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavBar } from '../navbar/navbar';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            user: null,
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    setSelectedMovies(movie) {
        this.setState({
            selectedMovies: movie,
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username,
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null,
        });
    }

    getMovies(token) {
        axios.get('https://shyflixapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.setState({
                    movies: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies, user } = this.setate;

        return (
            <Routes>
                <Row>
                    <NavBar user={user} />
                </Row>
                <Row className='main-view justify-content-md-center'>
                    <Route
                        exact path="/"
                        render={() => {
                            if (!user)
                                return (
                                    <Col>
                                        <MovieView
                                            movies={movies}
                                            onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className='main-view' />
                            return movies.map((m) => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            ));
                        }} />
                    <Route path='/regiter' render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />


                    <Route path='/movies/movieId' render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find((m) => m._id === match.params.movieId)}
                                onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path='/directors/:Name' render={({ match }) => {
                        if (movies.length === 0) return <div className='main-view' />
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.direcotr.Name === match.params.name).Name} />
                        </Col>
                    }} />

                    <Route path='/genre/:name' render={({ match }) => {
                        if (movies.length === 0) return <div className='main-view' />
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} />
                        </Col>
                    }} />

                </Row>
            </Routes>
        );
    }
}