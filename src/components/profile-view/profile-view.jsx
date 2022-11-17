import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Form, Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

export function ProfileView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    //Hooks for the inputs
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const { user, favoriteMovies, removeFavorite, onBackClick } = props;

    //Validate the user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username is required to login');
            isReq = false;
        } else if (username.length < 8) {
            setUsernameErr('Username must be at least 8 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password is required');
            isReq = false;
        } else if (password.length < 8) {
            setUsernameErr('Password needs to be at least 8 characters long')
            isReq = false;
        }
        if (!email) {
            setBirthdayErr('A valid email address is required');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('Avalid email address is required')
            isReq = false;
        }
        return isReq;
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const isReq = validate();
        const token = localStorage.getItem('token');
        if (isReq && token !== null && user !== null) {
            axios.put(`https://shyflixapp.herokuapp.com/users/${user}`, {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            },
                {
                    headers: {
                        Authorization: `Bearer${token}`,
                    }
                }
            )
                .them((res) => {
                    const data = authData;
                    updateUser(data.Username);
                    localStorage.setItem('user', data.Username);
                    alert('Update was successfull!');
                })
                .catch((e) => {
                    console.error(e);
                    alert('Not able to update');
                });
        }
    };
    const handleDelete = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (confirm('Are you sure you wanto delete your account?')) {
            axios.delete(`https://shyflixapp.herokuapp.com/users/${user}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .them((res) => {
                    alter(`You account has been removoved. We are sorry to see you go!`);
                    localStorage.clear();
                    deleteUser({});
                    window.open('/', '_self');
                })
                .catch((e) => console.log(e));
        }
    };
    return (
        <Container className='profile-container'>
            <Card bg='dark' text='light' className='profile-card'>
                <Card.Header className='text-center' as='h5'>
                    Profile
                </Card.Header>
                <Card.Body>
                    <CardGroup>
                        <Card bg='dark' border='dark' text='light'>
                            <span className='lebel text-center headline-profile-update'>Update your profile</span>
                            <Form>
                                <Form.Group className='profile-formg-group-username' controlId='formGroupUsername'>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your username here' />
                                    {usernameErr && <p>{usernameErr}</p>}
                                </Form.Group>
                                <Form.Group className='profile-form-group-password' controlId='formGroupPassword'>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password her (min 8 chatacters)' minLength='8' required />
                                    {passwordErr && <p>{passwordErr}</p>}
                                </Form.Group>
                                <Form.Group className='profile-form-group-email' controlId='formGroupEmail'>
                                    <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email address here' required />
                                    {emailErr && <p>{emailErr}</p>}
                                </Form.Group>
                                <Form.Group className='profile-form-group-birthday' controlId='formGroupBirthday'>
                                    <Form.Control type='date' value={birthday} onChange={(e) => (e.target.value)} placeholder='MM/DD/YYYY' />
                                    {birthdayErr && <p>{birthdayErr}</p>}
                                </Form.Group>

                                <Button className='button-profile-view-update' variant='secondary' type='submit' onClick={handleUpdate}>
                                    Update
                                </Button>
                            </Form>
                            <span className='label healiine-profile-mini-cards'>My favorite movies</span>
                        </Card>
                        <Card bg='dark' border='dark' text='light'>
                            <span className='lebel text-center headline-profile-delete'>Delete Account</span>
                            <Col>
                                <Button className='button button-profile-view-delete' variant='danger' type='submit' onClick={handleDelete}>
                                    DELETE MY ACCOUNT PERMANENTLY!!!
                                </Button>
                            </Col>
                        </Card>
                    </CardGroup>
                    <CardGroup className='card-group-profile-mini-cards'>
                        {favoriteMovies.map((e) => (
                            <Col md={6} lg={3} key={m._id} className='profile-movie-card-mini'>
                                <Card className='h-100' bg='dark' text='light'>
                                    <Link to={`/movies/$ {m._id}`} className='profile-movie-card-link'>
                                        <Card.Img variant='top' crossOrigin='anonymous | uer credentials' src={m.imagepath} />
                                        <Card.Body>
                                            <Card.Title>{m.Title}</Card.Title>
                                        </Card.Body>
                                    </Link>

                                    <Button className='button-profile-view-remove-favorites' variant='outline-danger' size='sm' type='button' onClick={() => removeFavorite(m._id)}>
                                        Remove movie
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </CardGroup>
                </Card.Body>
                <Card.Footer className='text-right'>
                    <Button className='button-profile-view-back' variant='secondary' onClick={() => {
                        onBackClick();
                    }}>
                        Back
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    );
}

ProfileView.propTypes = {
    user: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.array.isRequired,
    removeFavorite: propTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.uer
    };
};

export default connect(mapStateToProps, {
    deleteUser,
    updateUser
})(ProfileView);
