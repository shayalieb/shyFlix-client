import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import Container from 'react-bootstrap/Container';

import MainView from './components/main-view/main-view';


import './index.scss'
=======
import MainView from './components/main-view/main-view';
>>>>>>> parent of 721758b (Updated and functioning)
=======
import MainView from './components/main-view/main-view';
>>>>>>> parent of 721758b (Updated and functioning)
=======
import MainView from './components/main-view/main-view';
>>>>>>> parent of 721758b (Updated and functioning)


//Component will eventually bundle all
class MyShyFlixApplication extends React.Component {

    render() {
        return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <Container>
                <MainView />

            </Container>

        );
=======
            <MainView />
        )
>>>>>>> parent of 721758b (Updated and functioning)
=======
            <MainView />
        )
>>>>>>> parent of 721758b (Updated and functioning)
=======
            <MainView />
        )
>>>>>>> parent of 721758b (Updated and functioning)
    }
}




//Find the root of the app
const container = document.getElementsByClassName('app-container')[0];


//Telling react to render the app in the DOM
ReactDOM.render(React.createElement(MyShyFlixApplication), container);


