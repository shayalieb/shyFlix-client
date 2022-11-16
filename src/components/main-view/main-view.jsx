import React from "react";
import axios from "axios";
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap'
import { Menubar } from '../navbar/navbar'
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registeration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from '../director-view/director-view'
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


import './main-view.scss'

//Exporting the MainView to the rest of the app
export class MainView extends React.Component {

    constructor() {
        super();//Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    //Setting up the JWT token and inputting it into local storage for future use
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    //Using Axios to get the movies from the DB using the token
    getMovies(token) {
        axios.get('https://shyflixapp.herokuapp.com//movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                //resulsts will be assinged to the state
                this.props.setMoviess({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //When the user is successfully logged in, we update the user proporty to that particular user
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });
        //Putting the items into local storage fro future use
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username)
        this.getMovies(authData.token);
    }

    onRegistration(registered){
        this.setState({
            registered
        });
    }

    //When the user loggs out we remove the token from the local storage and set the state to null
    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <Menubar user={user} />
                <Container>
                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            ))
                        }} />
                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col>
                                <RegistrationView />
                            </Col>
                        }} />
                        <Route path="/movies/:movieId" render={({ match, history }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>

                        }} />
                        <Route path="/directors/:name" render={({ match, history }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                            </Col>

                        }} />
                        <Route path={`/users/${user}`} render={({ match, history }) => {
                            if (!user) return <Redirect to="/" />
                            return <Col>
                                <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route path={`/user-update/${user}`} render={({ match, history }) => {
                            if (!user) return <Redirect to="/" />
                            return <Col>
                                <UserUpdate user={user} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route path="/genres/:name" render={({ match, history }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                            </Col>

                        }} />

                    </Row>
                </Container>
            </Router>
        );
    }
}
let mapStateToProps = (state) => {
    return {movies: state.movies};
}

export default MainView;