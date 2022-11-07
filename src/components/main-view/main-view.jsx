import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
// import { MainView } from './components/main-view/main-view'


export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: 1,
                    Title: 'The Big Lebowski',
                    Description: 'Ultimate L.A. slacker Jeff The Dude Lebowski, mistaken for a millionaire of the same name, seeks restitution for a rug ruined by debt collectors, enlisting his bowling buddies for help while trying to find the millionaires missing wife....',
                    ImagePath: 'https://upload.wikimedia.org/wikipedia/en/3/35/Biglebowskiposter.jpg'
                },
                {
                    _id: 2,
                    Title: 'History of the World',
                    Description: 'Cavemen (including Sid Caesar) depict the invention of fire, the first artist (which in turn gives rise to the first critic), the first marriages (Homo sapiens and then homosexual), primitive weapons (particularly spears), and the first funerals. Also depicted are early attempts at comedy and music, by smashing each others feet with rocks and thus creating an orchestra of screams until performing Handels Hallelujah Chorus at the end.',
                    ImagePath: 'https://upload.wikimedia.org/wikipedia/en/5/59/History_of_the_World_poster.jpg'
                },
                {
                    _id: 3,
                    Title: 'Spinal Tap',
                    Description: 'A crazy wild band that is know for its insane stage presence. The band loses its fortune and resorts to performing at nursing homes.',
                    ImagePath: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Thisisspinaltapposter.jpg'
                }
            ],

        };
    }

    setSelectMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        })
    }




    render() {
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movie={selectedMovie} />

        if (movies.length === 0) return <div className="main-view">The movie list is empty</div>;

        return (
            <div className="main-view">
                {movies.map(movie => <MovieCard key={movie._id} movies={movie} onMovieClick={newSelectedMovie => { this.setState({ selectedMovie: newSelectedMovie }); }} />)}
            </div>
        );
    }


}

export default MainView;
