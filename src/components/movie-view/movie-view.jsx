import React from "react";
import { Button } from "react-bootstrap";
import '../../index.scss';

export class MovieView extends React.Component {



    render() {
        const { movie, onBackClick } = this.props;
        return (
            <div className='movie-view'>
                <div className='movie-poster'>
                    <img src={movie.imagepath} />
                </div>

                <div className='movie-title'>
                    <span className='label'>Movie Title</span>
                    <span className='value'>{movie.Title}</span>
                </div>

                <div className='movie-description'>
                    <span className='label'>Description</span>
                    <span className='value'>{movie.Description}</span>
                </div>

                <div className='movie-genre'>
                    <span className='label'>Genre</span>
                    <span className='value'>{movie.Genre.Name}</span>
                </div>

                <div className='movie-director'>
                    <span className='label'>Director0</span>
                    <span className='value'>{movie.Director.Name}</span>
                </div>

                <Button onClick={() => { onBackClick(null); }}>Back</Button>

            </div>

        );
    }
}


