import React from "react";
import PropTypes from 'prop-types';
<<<<<<< HEAD
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card>
        <Card.Img variant='top' src={movie.imagepath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant='link'>Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    })
  }).isRequired,
}
=======
=======
>>>>>>> parent of 721758b (Updated and functioning)

export class MovieCard extends React.Component {

    render() {
        const { movie, onMovieClick } = this.props;
        return (
            <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
        )
    }
}

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        imagepath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({

        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
>>>>>>> parent of 721758b (Updated and functioning)
