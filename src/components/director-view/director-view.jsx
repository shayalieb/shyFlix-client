import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-bootstrap';
import './director-view.scss';

export default class DirectorView extends React.Component {
    render() {

        const { movie, director, onBackClick } = this.props;

        return (
            <Card bg='dark' text='light'>
                <Card.Header className='text-center' as='h4'>
                    {director.Name}
                </Card.Header>
                <Card.Body className='text-area'>
                    <Card bg='dark' border='dark' text='light'>
                        <div className='movie-director-birth'>
                            <span className='label'>Date of Birth</span>
                            <span className='value'>{director.Birth}</span>
                        </div>
                        <div className='movie-director-death'>
                            <span className='label'>Death</span>
                            <span className='value'>{director.Death}</span>
                        </div>
                        <div className='movie-director-bio'>
                            <span className='label'>Biography</span>
                            <span className='value'>{director.Bio}</span>
                        </div>
                        <span className='label headline-direcotr-mini-cards'>
                            Movies by this director
                        </span>
                        <CardGroup className='card-group-director-mini-cards'>
                            {movie.map((m) => {
                                <Col md={6} lg={3} key={m._id} className='director-movie-card-mini'>
                                    <Link to={`/movies/${m._id}`}>
                                        <Card className='h-100' bg='dark' text='light'>
                                            <Card.Img variant='top' crossOrigin='anonymous | use=credentials' scr={m.imagepath} />
                                            <Card.Body>
                                                <Card.Title>{m.Title}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            })}
                        </CardGroup>
                    </Card>
                </Card.Body>
                <Card.Footer className='text-right'>
                    <Button className='button-director-view' variant='secondary' onClick={() => {
                        onBackClick();
                    }}>
                        Go Back
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

DirectorView.propTypes = {
    movies: PropTypes.array.isRequired,
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};