import React, { useState } from "react";
import axios from 'axios';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    //setting the hooks
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username is required');
            isReq = false;
        } else if (username.length < 8); {
            setUsernameErr('Username must be at least 8 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password is required');
            isReq = false;
        } else if (password.length < 8) {
            setPasswordErr('Password must be at least 8 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Email is required');
            isReq = false;
        } else if (email.indexOf("@") === -1) {
            setEmailErr('Please provide a valid email address');
            isReq = false;
        }
        return isReq;

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://shyflixapp.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Welcome to the shyFlixApp, please return to login');
                    window.open('/', '_self');//Opens in the current tab
                })
                .catch(response => {
                    console.error(response);
                    alert('Unable to register');
                });
        }
    };

    return (
        <Row className="mt-5">
            <Col md={12}>
                <From>
                    <h3>Sign Up</h3>
                    <p></p>
                    <Form.Group controlId="formUsername" className="reg-form-inputs">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type='text' value={username} onChange={e => setUsername(e.target.value)} />
                        {usernameErr && <p>{usernameErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="reg-form-inputs">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} />
                        {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>
                    <Form.group controlId='email' className='reg-form-inputs'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='email' value={email} onChange={e => setEmail(e.target.value)} />
                        {emailErr && <P>{emailErr}</P>}
                    </Form.group>
                    <Form.Group controlId="updateBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type='date' name='birthday' onChange={(e) => setBirthday(e.target.value)} />
                    </Form.Group>
                    <Button variant='primary' type='submit' onClick={handleSubmit}>Sign Up</Button>
                    <p></p>
                    <p>Already registered<Link to={'/'}></Link> here </p>
                </From>
            </Col>
        </Row>
    );

}

RegistrationView.PropTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
};

