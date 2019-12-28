import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/app';

import './index.css';
import GotService from "./services/gotService";


// new GotService().getAllBooks().then(res => console.log(res));
// new GotService().getBook(12).then(res => console.log(res));
// new GotService().getAllCharacters().then(res => console.log(res));
// new GotService().getCharacter(2138).then(res => console.log(res));
new GotService().getAllHouses().then(res => console.log(res));
new GotService().getHouse(444).then(res => console.log(res));

ReactDOM.render(<App />, document.getElementById('root'));