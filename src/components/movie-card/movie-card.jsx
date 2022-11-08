import React from "react";
import '../../index.scss'

export class MovieCard extends React.Component {

    render() {
        const { movie, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>
    }

}    
