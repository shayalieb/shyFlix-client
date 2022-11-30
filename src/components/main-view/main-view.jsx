import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Redirect, Link, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';


import { NavBar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdatedUser } from '../profile-view/updated-user';

class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');;
        if (accessToken !== null) {
            this.props({
                user: localStorage.getItem('user')
            });
            this(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://shyflixapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.props(response.data);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.props({
            user: authData.user.Username,
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', user.Username);
        this(authData.token)
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            use: null
        })
        window.open('/', '_self');
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie,
        });
    }

    render() {
        const { movies, user } = this.props;

        return (
            <Router>
                <NavBar user={user} />
                <Row className='main-view justify-content-md-center'>
                    <Route
                        exact
                        path='/'
                        render={() => {
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            // if (movies.length === 0) return <div className='main-view' />
                            // // return <MovieList movies={movies} />
                        }} />

                    <Route path='/register' render={() => {
                        if (user) return <Redirect to='/' />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />


                    <Route path={`/users/${user}`}
                        render={({ history }) => {
                            if (!user) return <Redirect to='/' />;
                            return (
                                <Col>
                                    <ProfileView
                                        user={user}
                                        onBackClick={() => history.goBack()}
                                        movies={movies} />
                                </Col>
                            );
                        }} />

                    <Route path={`/update-user/${user}`}
                        render={({ match, history }) => {
                            if (!user) return <Redirect to='/' />
                            return (
                                <Col>
                                    <UpdatedUser
                                        user={user}
                                        onBackClick={() => history.goBack()} />
                                </Col>
                            );
                        }} />

                    <Route path='/movies/movieId'
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <Col md={8}>
                                        <MovieView
                                            movie={movies.find((m) => m._id === match.params.movieId)}
                                            onBackClick={() => history.goBack()} />
                                    </Col>
                                );
                        }} />

                    <Route path='/movies.Director/:Name'
                        render={({ match }) => {
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className='main-view' />;
                            return (
                                <Col md={8}>
                                    <DirectorView
                                        director={movies.find((m) => m.Director.Name === match.params.Name).Director}
                                        onBackClick={() => history.goBack()} />
                                </Col>
                            );
                        }} />

                    <Route path='/Genre/:Name'
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className='main-view' />
                            return (
                                <Col md={8}>
                                    <GenreView
                                        genre={movies.find(m => m.Genre.Name === match.params.Name).Genre}
                                        onBackClick={() => history.goBack()} />
                                </Col>

                            );
                        }} />
                </Row>
            </Router>
        );
    }
}

MainView.propTypes = {
    movies: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
        }),
    }),
    user: PropTypes.string.isRequired,
};

// let mapStateToProps = state => {
//     return {
//         movies: state.movies,
//         user: state.user,
//         FavoriteMovies: state.FavoriteMovies,
//     };
// };

export default MainView;