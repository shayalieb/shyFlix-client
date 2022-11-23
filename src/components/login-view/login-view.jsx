import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //Hooks for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username is required');
            isReq = false;
        } else if (username.length, 8) {
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
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq)
            axios.post('https://shyflixapp.herokuapp.co/login', {
                Username: username,
                Password: password
            })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    console.log('The user does not exist')
                });
    };

    return (
        <Form>
            <Form.Group controlId='formUsername'>
                <Form.Label>Usernaame:</Form.Label>
                <Form.Control type='text' placeholder='Enter username here' value={username} onChange={e => setUsername(e.target.value)} />
                {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' placeholder='Enter password here' value={password} onChange={e => setPassword(e.target.value)} />
                {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Button variaty='primary' type='submit' onClick={handleSubmit}>Login</Button>
        </Form>
    )
}