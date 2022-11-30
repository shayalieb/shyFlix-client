<<<<<<< HEAD
import React from 'react';
import propTypes from 'prop-types';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
=======
import React from "react";
import '../../index.scss';
>>>>>>> parent of 721758b (Updated and functioning)

export class MovieView extends React.Component {
    render() {

        const { movie, onBackClick } = this.props;

        return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
                            <Link to={`/Director/${movie.Director.Name}`}>
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
=======
=======
>>>>>>> parent of 721758b (Updated and functioning)
=======
>>>>>>> parent of 721758b (Updated and functioning)
=======
>>>>>>> parent of 721758b (Updated and functioning)
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.imagepath} />
                </div>
                <div className="movie=title">
                    <span className="lablel">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 721758b (Updated and functioning)
=======
>>>>>>> parent of 721758b (Updated and functioning)
=======
>>>>>>> parent of 721758b (Updated and functioning)
=======
>>>>>>> parent of 721758b (Updated and functioning)
        );
    }
}

<<<<<<< HEAD
MovieView.propTypes = {
    movie: propTypes.shape({
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        Genre: propTypes.shape({
            Name: propTypes.string.isRequired,
            Description: propTypes.string.isRequired,
        }),
        Director: propTypes.shape({
            Name: propTypes.string.isRequired,
            Bio: propTypes.string,
            Birth: propTypes.string,
        })
    }).isRequired,
    onBackClick: propTypes.func.isRequired,
};
=======


<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 721758b (Updated and functioning)
=======
>>>>>>> parent of 721758b (Updated and functioning)
=======
>>>>>>> parent of 721758b (Updated and functioning)
=======
>>>>>>> parent of 721758b (Updated and functioning)
