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
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [values, setValues] = useState({
        nameErr: '',
        usernameErr: '',
        passwordErr: '',
        emailErr: ''
    })

    const validate = () => {
        let isReq = true;
        if (name) {
            setValues({ values, nameErr: 'You must provide your name' });
            isReq = false
        }
        if (!username) {
            setValues({ values, usernameErr: 'Username must be a valid email address' });
            isReq = false;
        } else if (username.length < 2) {
            setValues({ values, usernameErr: 'Username must be a valid email address' });
            isReq = false;
        }
        if (!password) {
            setValues({ values, passwordErr: 'Password is required' });
            isReq = false;
        } else if (password.length < 8) {
            setPassword('Password must be at least 8 characters long');
            isReq = false;
        }
        if (!email) {
            setValues({ values, emailErr: 'You must provide a valid email address' });
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({ values, emailErr: 'You must provide a valid email address' })
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://shyflixapp.herokuapp.com/users', {
                Name: name,
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('You are now signed up, please login to continue!');
                    window.open('/', '_self')
                })
                .catch(response => {
                    console.error(response);
                    alert('You are unable to register, please try again');
                });
        }
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
                                    <Form.Group controlId="fromName">
                                        <Form.Label>Your Name:</Form.Label>
                                        <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} required placeholder="Please enter your name" />
                                        {values.nameErr && <p>{values.nameErr}</p>}
                                    </Form.Group>
                                    <FormGroup controlId='fromUsername'>
                                        <From.Label>Username:</From.Label>
                                        <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter email as username" />
                                        {values.usernameErr && <p>{values.usernameErr}</p>}
                                    </FormGroup>

                                    <Form.Group controlId='formPassword'>
                                        <From.Label>Password:</From.Label>
                                        <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder='Password must be min 8 characters' />
                                        {values.passwordErr && <p>{values.passwordErr}</p>}
                                    </Form.Group>

                                    <Form.Group controlId='formEmail'>
                                        <Form.Label>Email</Form.Label>
                                        <From.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='example@exampl.com' />
                                        {values.emailErr && <p>{values.emailErr}</p>}
                                    </Form.Group>

                                    <Form.Group controlId='formBirthday'>
                                        <Form.Label>Birthday</Form.Label>
                                        <From.Control type='birthday' value={birthday} onChange={(e) => setBirthday(e.target.value)} required placeholder='DD/MM/YYYY' />
                                    </Form.Group>

                                    <Button varient='primary' type='submit' onClick={handleSubmit}>Register</Button>
                                    <p></p>
                                    <p>Aready registered?<link src='https://shyflixapp.herokuapp.com/login'>Login</link> here</p>

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
    register: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
};