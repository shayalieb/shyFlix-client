import React, { useState } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { RegistrationView } from "../registration-view/registration-view";
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //Hooks
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username is required');
            isReq = false;
        } else if (username.length < 6) {
            setPasswordErr('Username has to be at lease 6 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password it required')
            isReq = false;
        } else if (password.length < 8) {
            setPasswordErr('Password must be at lese 8 characters long')
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://shyflixapp.herokuapp.com/login', {
                Username: username,
                Password: password
            })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch((err) => {
                    console.log('Login failed', err);
                })
        }
    };

    return (
        <Container fluid>
            <Navbar bg='dark' expand='lg'>
                <Navbar.Brand href='#Home'>Movies</Navbar.Brand>
                <Navbar.Toggle aira-controls='basic navbar'></Navbar.Toggle>
                <Navbar.Collapse id='basic navbar'>
                    <Nav className="me-auto">
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Form>
                <Form.Group controlId='formUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter username'
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                    {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>
                <Form.Gorup controlId='formPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    {passwordErr && <p>{passwordErr}</p>}
                </Form.Gorup>

                <Button variant='primary' type='submit' onClick={handleSubmit}>Login</Button>

            </Form>
        </Container>
    )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};