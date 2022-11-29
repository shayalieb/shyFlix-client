import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { Button, Col, Row, Container } from 'react-bootstrap';

export class DirectorView extends React.Component {
    render() {
        const { Director, onBackClick } = this.props;
        axios.get('https://shyflixapp.herokuapp.com/movies/Director/:id')
        return (
            <Container className='Director=view'>
                <Row>
                    <Col className='label'>Director</Col>
                    <Col className='value'>{Director.Name}</Col>
                </Row>

                <Row>
                    <Col className='label'>Bio</Col>
                    <Col className='value'>{Director.Bio}</Col>
                </Row>

                <Row>
                    <Col className='label'>Birth</Col>
                    <Col className='value'>{Director.Birth}</Col>
                </Row>

                <Row>
                    <Col className='label'>Death</Col>
                    <Col className='value'>{Director.Death}</Col>
                </Row>

                <Button onClick={() => { onBackClick(null); }} variant='primary'>Back</Button>


            </Container>
        )
    }
}

DirectorView.PropTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
    }).isRequired,
};