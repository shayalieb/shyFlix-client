import React from "react";
import axios from 'axios'

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { RegistrationView } from '../registeration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import { Row, Col } from 'react-bootstrap'

export class MainView extends React.Component {
    //Initial state is set to null as there is not user logged in yet
    constructor() {
        Super();
        this.state = {
            movies: [],
            users: null
        };
    }

    //add the token to local storage to stay logged in for a period of time
    componentDidMount() {
        let accessToken = localStorage.getItem('token')
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    //Get the movies from the database using Axios and set the state to the list of movies
    getMovies(token) {
        axios.get('https://shyflixapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    //When the user successfully logs in the function updates and sets the state to the user, and adds the token to the local storage
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.uer.Usernam
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    //Now let render the page
    render() {
        const { movies, user } = this.state;
        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route exact path='/' render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />
                    <Route path='/register' render={() => {
                        if (user) return <Redirect to='/' />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />
                    <Route path='/movies/:id' render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.id)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path='/directors/:name' render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />
                        return <Col ms={8}>
                            <DirectorView director={movies.find(m => m.director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path='/genres/:name' render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>
        );
    }

}