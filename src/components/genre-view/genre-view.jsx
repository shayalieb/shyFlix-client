import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row, Container } from 'react-bootstrap';

export class GenreView extends React.Component {
    render() {
        const { Genre, onBackClick } = this.props;
        return (
            <Container className='genre-view'>
                <Row>
                    <Col className='label'>Genre</Col>
                    <Col className='value'>{Genre.Name}</Col>
                </Row>

                <Row>
                    <Col className='label'>Description</Col>
                    <Col className='value'>{Genre.Description}</Col>
                </Row>

                <Button onClick={() => { onBackClick(null); }} variant='primary'>Back</Button>
            </Container>
        )
    }
}

GenreView.PropTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string,
    }).isRequired,
}