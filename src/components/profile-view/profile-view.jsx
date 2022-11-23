import React from 'react';
import axios from 'axios';
import PropTypes from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

import './profile-view.scs';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('user');
        this.getUser(accessToken);
    }

    onRemoveFavorite = (movie) => {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        console.log(movie)
        axios.delete(`https://shyflixapp.herokuapp.com/users/${username}/movies/${movie}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                console.log(response);
                alert('The movie has been removed from favorites!');
                this.componentDidMount
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.state({
            user: null
        });
        window.open('/', '_self');
    }

    getUser = (token) => {
        const Username = localStorage.getItem('user');
        axios.get(`https://shyflixapp.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    //Edit a user profile
    editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.put(`https://shyflixapp.herokuapp.com/users/${Username}`,
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday,
            },
            { headers: { Authorization: `Bearer ${token}` }, }
        )
            .then((response) => {
                console.log(response)
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });
                localStorage.setItem('user', this.state.Username);
                const data = response.data;
                console.log(data)
                console.log(this.state.Username);
                alert('Your profile has been updated');
                window.open(`/users/${Username}`, '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    //Delete you account
    onDeleteUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://shyflixapp.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response);
                alert('Your account has been deleted');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open(`/`, '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    //Setting the user values
    setUsername(value) {
        this.setState({
            Username: value,
        });
    }

    setPassword(value) {
        this.setState({
            Password: value,
        });
    }

    setEmail(value) {
        this.setState({
            Email: value,
        })
    }

    setBirthday(value) {
        this.setState({
            Birthday: value,
        })
    }

    render() {
        const { movies, user } = this.props;
        const { FavoriteMovies, Email, Birth } = this.state;
        const favoriteMovies = FavoriteMovies.map((movieId) =>
            movies.find((movie) => movie._id === movieId)
        );

        return (
            <Container>
                <Row>
                    <Col lg={5} className='mb-4'>
                        <h4>Your Account</h4>
                        <Card>
                            <Card.Body>
                                <Card.Text>Username:</Card.Text>
                                <Card.Text>Email</Card.Text>
                                <Card.Text>Birthday:{moment(Birthday).format('MM/DD/YYYY')}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={7} className='mb-5'>
                        <h4>Update your profile details</h4>
                        <Card>
                            <Form className='p-4'>
                                <Form.Group className='mb=3' controlId='formUsername'>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='Username'
                                        placeholder={this.state.Username}
                                        onChange={(e) => this.setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className='mb-4' controlId='formPassword'>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type='password'
                                        name='Password'
                                        placeholder='Enter new password'
                                        onChange={(e) => this.setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-4' controlId='formEmail'>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type='email'
                                        name='Email'
                                        placeholder={this.staet.Email}
                                        onChange={(e) => this.setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className='mb-4' controlId='formBirth'>
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control 
                                        type='date'
                                        name='Birthday'
                                        placeholder={this.state.Birthday}
                                        onChange={(e) => this.setBirthday(e.target.value)}
                                    />
                                </Form.Group>
                                <div className='d-flex justify-content-between'>
                                    <Button variaty='primary' type='submit' onClick={updateUser}>
                                        Update Profile
                                    </Button>{' '}
                                    <Button variant='outline-danger' type='submit' onClick={this.onDeleteUser}>
                                        Delete Account
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                <>
                <Row>
                    {favoriteMovies.map((movie) => (
                        <Col lg={3} md={6} key={movie._id}>
                            
                        </Col>
                    ))}
                </Row>
                </>
            </Container>
        )
    }

}

