import React, { Fragment, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';

export function FavoriteMovie(props) {
    const { movie, FavoriteMovies, currentUser, token } = props;
    const favoriteMovieId = FavoriteMovies.map(m => m._id);
    const favoriteMovieList = movie.filter(m => {
        return favoriteMovieId.includes(m._id);
    });

    const handleMovieDelete = (movieId) => {
        axios.delete(`https://shyflixapp.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                alert('THis movie has been deleted')
                window.open('/users/:Username', '_self');
            })
            .catch((error) => console.error(error));
    };

    return (
        <Fragment>
            {favoriteMovieList.length === 0 ? (
                <p>The movie list is empty</p>
            ) : (
                favoriteMovieList.map((m) => {
                    return (
                        <Col xs={10} sm={8} md={6} lg={4}>
                            <Card id='movie-card'>
                                <Link to={`movies/${movie_id}`}>
                                    <Card.Img variant='top' src={movie.imgpath} />
                                </Link>
                                <Card.Body>
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Card.Text>{movie.Desription}</Card.Text>
                                    <Link to={`/movies/${movie._id}`}>
                                        <Button
                                            className="button"
                                            variant="outline-primary"
                                            size='sm'>
                                            Open
                                        </Button>
                                        <Button
                                            className="button ml-2"
                                            variant="outline-primary"
                                            size='small'
                                            onClick={() => {
                                                handleMovieDelete(movie_id);
                                            }}>
                                            Remove
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })
            )}
        </Fragment>
    );

};