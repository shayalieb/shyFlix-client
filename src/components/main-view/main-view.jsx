//Import packages
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Import the various views
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from '../registeration-view/registration-view';
//Import the react-bootstrap features
import Row from "react-bootstrap";
import Col from "react-bootstrap";
import Button from "react-bootstrap";

import './main-view.scss';

//Export the MainView Class to the other windows
export class MainView extends React.Component {
    //initialize class component
    cunstructor() {
        //Call the parent class and finctions
        super();

        this.state = {
            movies: [],
            user: null
        };
    }
    getMovies(token) {
        axios.get('https://shyflixapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                //Assigning the results of the state here
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken)
        }
    }

    onLoogedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.username
        });
        //Caching in local torage
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        this.setState({
            user: null
        });
    }

    render() {
        const { movies, user } = this.state;

        if (!user) return <Row>
            <Col>
                <LoinView onLoogedIn={user => this.onLoogedIn(user)} />
            </Col>
        </Row>
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route exact path='/' render={() => {
                        return movies.map(m => (
                            <Col md={3} key={m / _id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />
                    <Route path="/movies/:id" render={({ match }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.id)} />
                        </Col>
                    }} />
                </Row>
            </Router>
        );
    }
}
