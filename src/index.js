import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/app';

import './index.css';
import GotService from "./services/gotService";

new GotService().getCharacter(145).then(res => console.log(res));

ReactDOM.render(<App />, document.getElementById('root'));