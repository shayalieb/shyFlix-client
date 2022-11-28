import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export function UpdatedUser(props) {
    const { user } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [values, setValues] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
    });

    const validate = () => {
        let isReq = true;
        if (!username) {
            setValues({ ...values, usernameErr: 'Username is required' })
        } else if (username.length < 6) {
            setValues({ ...values, usernameErr: 'Username must be a minimun of 6 characters long' });
            isReq = false;
        }
        if (!password) {
            setValues({ ...values, passwordErr: 'Pass is required' });
            isReq = false;
        } else if (password.length < 8) {
            setValues({ ...values, passwordErr: 'Password must be at least 8 characters long' });
            isReq = false;
        }
        if (!email) {
            setValues({ ...values, emailErr: 'Email address is required' });
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({ ...values, emailErr: 'Invalid email address' });
            isReq = false;
        }
        return isReq;
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
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch((err) => {
                    console.log('Login failed', err);
                    alert('Update was successful')
                })
        }
    };

    return (
        <Container>
            <Row><h3>Edit your profile</h3></Row>
            <Row>
                <Form>
                    <Form.Group controlId='formUsername'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='text'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder='Update Username'
                            required />
                        {values.usernameErr && <p>{values.usernameErr}</p>}
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='text'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Update Password'
                            required />
                        {values.passwordErr && <p>{values.passwordErr}</p>}
                    </Form.Group>

                    <Form.Group controlId='formEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Update Email'
                            required />
                        {values.emailErr && <p>{values.emailErr}</p>}
                    </Form.Group>

                    <Form.Group controlId='formBirthday'>
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            type='text'
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                            placeholder='MM/DD/YYYY'
                            required />
                    </Form.Group>

                    <Button variant='warning' type='submit' onClick={handleSubmit}>
                        Update Profile
                    </Button>

                </Form>
            </Row>
        </Container>
    );
}

export default UpdatedUser;
