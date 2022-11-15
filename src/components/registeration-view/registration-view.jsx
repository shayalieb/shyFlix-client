import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
    From,
    Button,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
    FormGroup,
    Form
} from 'react-bootstrap';
import axios from "axios";


export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username is required');
            isReq = false;
        } else if(username.length < 2) {
            setUsernameErr('Username must be at least 2 characters long');
            isReq = false;
        }
        if(!passwor) {
            setPasswordErr('Password is required');
            isReq = false;
        } else if (password.length < 8) {
            setPassword('Password must be at least 8 characters long');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = vlaidate();
        if(isReq) {
            axios.post('')
        }
        cconsole.log(username, password, email, birthday);
        props.Registration(username);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Title>Please register here</Card.Title>
                            <Card.Body>
                                <Form>
                                    <FormGroup controlId='fromUsername'>
                                        <From.Label>Username:</From.Label>
                                        <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter email as username" />
                                    </FormGroup>

                                    <Form.Group controlId='formPassword'>
                                        <From.Label>Password:</From.Label>
                                        <Form.Control type='password' value={password} onChange={(e) => setPassword(e.traget.value)} required minLength={8} placeholder='Password must be min 8 characters' />
                                    </Form.Group>

                                    <Form.Group controlId='formEmail'>
                                        <Form.Label>Email</Form.Label>
                                        <From.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='example@exampl.com' />
                                    </Form.Group>

                                    <Form.Group controlId='formBirthday'>
                                        <Form.Label>Birthday</Form.Label>
                                        <From.Control type='birthday' value={birthday} onChange={(e) => setBirthday(e.target.value)} required placeholder='DD/MM/YYYY' />
                                    </Form.Group>

                                    <Button varient='primary' type='submit' onClick={handleSubmit}>Register</Button>

                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired
};