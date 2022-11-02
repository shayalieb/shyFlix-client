import React from 'react';
import ReactDOM from 'react-dom';

//Indications that we need to bundle
import './index.scss';

//Component will eventually bundle all
class myShyFlixApplication extends React.Component {
    render() {
        return (
            <div className='shyFilxApp'>
                <div>Good Afternoon</div>
            </div>
        );
    }
}

//Find the root of the app
const container = document.getElementsByClassName('app-container')[0];

//Telling react to render the app in the DOM
ReactDOM.render(React.createElement(myShyFlixApplication), container);