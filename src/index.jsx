import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

import MainView from './components/main-view/main-view';


import './index.scss'


//Component will eventually bundle all
class MyShyFlixApplication extends React.Component {

    render() {
        return (
            <Container>
                <MainView />

            </Container>

        );
    }
}




//Find the root of the app
const container = document.getElementsByClassName('app-container')[0];


//Telling react to render the app in the DOM
ReactDOM.render(React.createElement(MyShyFlixApplication), container);


