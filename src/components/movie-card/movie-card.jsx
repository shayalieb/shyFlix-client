import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {

    render() {
        const { movie, onMovieClick } = this.props;
        return (
            <Card>
                <Card.Img variant='top' src={movie.imagepath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>

                    <Button onClick={() => onMovieClick(movie)} varient='link'>
                        {" "}
                        Open
                    </Button>
                </Card.Body>
            </Card>
        )

    }
}

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        imagepath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};