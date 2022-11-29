import React, { useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios'
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [values, setValues] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
        birthdayErr: '',
    });

    const validate = () => {
        let isReq = true;
        if (!username) {
            setValues({ ...values, usernameErr: 'Username is required' });
            isReq = false;
        } else if (username.length < 6) {
            setValues({ ...values, usernameErr: 'Username must be at least 6 characters long' });
            isReq = false;
        }
        if (!password) {
            setValues({ ...values, passwordErr: 'Password is required' });
            isReq = false;
        } else if (password.length < 8) {
            setValues({ ...values, passwordErr: 'Password must be at lease 8 characters long' });
            isReq = false;
        }
        if (!email) {
            setValues({ ...values, emailErr: 'Email is required' });
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({ ...values, emailErr: 'Please provide a valid email address' });
            isReq = false;
        }
        return isReq
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://shyflixapp.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday,
            })
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    window.open('/', '_self');
                });
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Register</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type='text'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            placeholder='Enter username (must be at least 6 characters long'
                                            {...values.usernameErr && <p>{values.usernameErr}</p>} />
                                    </Form.Group>

                                    <From.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type='text'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={8}
                                            placeholder='Password  must be at least 8 characters long'
                                            {...values.passwordErr && <p>{values.passwordErr}</p>} />
                                    </From.Group>

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder='example@example.com'
                                            {...values.emailErr && <p>{values.emailErr}</p>} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                            type='date'
                                            value={birthday}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder='MM/DD/YYYY'
                                            {...values.birthdayErr && <p>{values.birthdayErr}</p>} />
                                    </Form.Group>

                                    <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>

                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}

RegistrationView.propTypes = {
    register: propTypes.shape({
        Username: propTypes.string.isRequired,
        Password: propTypes.string.isRequired,
        Email: propTypes.string.isRequired,
        Birthday: propTypes.string.isRequired
    }),
};