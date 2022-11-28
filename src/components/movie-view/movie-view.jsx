import React from 'react';
import propTypes from 'prop-types';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
        return (
            <Container fluid className='movie-container'>
                <Row>
                    <Col>
                        <div className='movie-image'>
                            <img src={movie.imagepath} />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='movie-title'>
                            <span className='label'>Title:</span>
                            <span className='value'>{movie.Title}</span>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='movie-genre'>
                            <span className='label'>Genre:</span>
                            <span className='value'>{movie.Genre.Name}</span>
                            <Link to={`/genre/${movie.genre.name}`}>
                                <Button variant='link'>Genre</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='movie-director'>
                            <span className='label'>Director:</span>
                            <span className='value'>{movie.Director.Name}</span>
                            <Link to={`/director/${movie.Director.Name}`}>
                                <Button variant='link'>Director</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button onClick={() => {
                            onBackClick(null);
                        }}>
                            Back
                        </Button>
                    </Col>
                </Row>

            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: propTypes.shape({
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        Genre: propTypes.shape({
            Name: propTypes.string.isRequired,
            Description: propTypes.string.isRequired,
        }),
        director: propTypes.shape({
            Name: propTypes.string.isRequired,
            Bio: propTypes.string,
            Birth: propTypes.string,
        })
    }).isRequired,
    onBackClick: propTypes.func.isRequired,
};