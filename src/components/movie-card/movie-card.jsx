import React from "react";

export class MovieCard extends React.Component {

    render() {
        const { movies, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movies); }}>{movies.Title}</div>;
    }
}

