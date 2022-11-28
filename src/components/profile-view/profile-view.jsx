import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Col, Row, Container } from 'react-bootstrap';
import { FavoriteMovie } from './favorite-movie';
import UpdateUser from './updated-user';
import { useState } from 'ract';
import { useEffect } from 'react';

export function ProfileView(props) {
    const [user, setUser] = useState(props.user);
    const [movies, setMovies] = useState(props.movies);
    const [FavoriteMovies, setFavoriteMovies] = useState(props.FavoriteMovies);
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const getUser = () => {
        axios.get(`https://shyflixapp.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                setUser(response.data);
                setFavoriteMovies(response.data.FavoriteMovis)
            })
            .catch(function (error) {
                console.log('Falied to retrieve you data', error);
            })
    }

    useEffect(() => {
        getUser();
    }, []);

    const handleDelete = () => {
        axios.delete(`https://shyflixapp.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                alert(`${user.name}'s account has been deleted.`)
                localStorage.clear();
                window.open('/register', '_self');
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container>
            <Row><h3>Your account details</h3></Row>
            <Row>
                <Col className='label'>Username</Col>
                <Col className='value'>{user.username}</Col>
            </Row>

            <Row>
                <Col className='label'>Password</Col>
                <Col className='Value'>{user.password}</Col>
            </Row>

            <Row>
                <Col className='label'>Email</Col>
                <Col className='vlaue'>{user.email}</Col>
            </Row>

            <Row>
                <Col className='label'>Birthday</Col>
                <Col className='value'>{user.birthday}</Col>
            </Row>

            <Row className='mt-5'><h2>Favorite Movies</h2></Row>

            <Row className='mt-3'>
                <FavoriteMovie
                    movies={movies}
                    FavoriteMovies={FavoriteMovie}
                    currentUser={currentUser}
                    token={token} />
            </Row>

            <UpdateUser user={user} />

            <Button className='d-block mt-5' variant='danger' onClick={handleDelete}>Delete Account</Button>
        </Container>
    )
};
