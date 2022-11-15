<<<<<<< Updated upstream
import axios from 'axios';
=======
import axios from "axios";
>>>>>>> Stashed changes
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
import './login-view.scss'



export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
<<<<<<< Updated upstream
        e.preventDefault();
        axios.post('https://shyflixapp.herokuapp.com/login', {
=======
        e.preventDefault()
        axios.post('https://shyflixapp.herokuapp.com', {
>>>>>>> Stashed changes
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
<<<<<<< Updated upstream
                console.log('The user does not exist')
=======
                console.log('no such user')
>>>>>>> Stashed changes
            });
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
       
                                        <Form.Control className="input-field" type="text" onChange={(e) => setUsername(e.target.value)} required placeholder="Enter Username (email)" />
                                    </Form.Group>
        
                                    <Form.Group controlId="formPassword">
                                        <Form.Label className="form-text">Password:</Form.Label>

                                        <Form.Control className="input-field" type="password" onChange={(e) => setPassword(e.target.value)} minLength="8" placeholder="Enter password" />
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

