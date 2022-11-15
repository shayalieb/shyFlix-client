import axios from 'axios';
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


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Title>Please login here</Card.Title>
                            <Card.Body>

                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} required placeholder="Enter Username (email)" />
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} minLength="8" placeholder="Enter password" />
                                    </Form.Group>

                                    <Button variety="primary" type="submit" onClick={handleSubmit}>Login</Button>

                                </Form>
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

