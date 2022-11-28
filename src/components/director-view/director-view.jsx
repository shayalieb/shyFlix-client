import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { Button, Col, Row, Container } from 'react-bootstrap';

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;
        axios.get('https://shyflixapp.herokuapp.com/movies/Director/:id')
        return (
            <Container className='director=view'>
                <Row>
                    <Col className='label'>Director</Col>
                    <Col className='vlaue'>{Director.Name}</Col>
                </Row>

                <Row>
                    <Col className='label'>Bio</Col>
                    <Col className='vlaue'>{Birector.Bio}</Col>
                </Row>

                <Row>
                    <Col className='label'>Birth</Col>
                    <Col className='vlaue'>{Director.Birth}</Col>
                </Row>

                <Row>
                    <Col className='label'>Death</Col>
                    <Col className='vlaue'>{Director.Death}</Col>
                </Row>

                <Button onClick={() => { onBackClick(null); }} variant='primary'>Back</Button>


            </Container>
        )
    }
}

DirectorView.PropTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
    }).isRequired,
};