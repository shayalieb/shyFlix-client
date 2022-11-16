import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Form,
    Button,
    Container,
    Card,
    CardGroup,
    Col,
    Row
} from "react-bootstrap";
import axios from 'axios';
import './login-view.scss'



export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //Delaring hooks for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    //Validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username is required');
            isReq = false;
        } else if (username.length < 4) {
            setUsernameErr('Username must be your email address');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password is required');
            isReq = false;
        } else if (password.length < 8) {
            setPassword('Password must be at least 8 characters long')
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
                .catch(e => {
                    console.log('The user does not exist')
                });
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Title className="LoginView-title">Please login here</Card.Title>
                            <Card.Body>

                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label className="form-text">Username:</Form.Label>

                                        <Form.Control className="input-field" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter Username (email)" />
                                        {usernameErr && <P>{usernameErr}</P>}
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label className="form-text">Password:</Form.Label>

                                        <Form.Control className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="8" placeholder="Enter password" />
                                        {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>
                                    <br></br>
                                    <Button variety="primary" type="submit" onClick={handleSubmit}>Login</Button>
                                </Form>
                                <br></br>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};

