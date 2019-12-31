import React, {Component} from 'react';
import { Button } from 'reactstrap';

import './randomChar.css';
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

export default class RandomChar extends Component {
    constructor() {
        super();
        this.updateChar = this.updateChar.bind(this);

    }

    gotService = new GotService();
    state = {
        char: {},
        loading: true,
        error: false
    };
    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 1500);
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    componentDidCatch() {
        console.log('error randomChar');
        this.setState({
            error: true
        });
    }

    onCharLoaded(char) {
        this.setState({
            char,
            loading: false
        })
    }
    onError(err) {
        this.setState({
            error: err.status,
            loading: false
        });
        clearInterval(this.timerId);
    }
    updateChar() {
        const id = Math.floor(Math.random()*2137 + 1);
        // const id = 12300000;
        this.gotService.getCharacter(id)
            .then(res => this.onCharLoaded(res))
            .catch((err) => this.onError(err));
    }

    render() {
        const { char, loading, error } = this.state;
        const onUpdateChar = this.updateChar;

        const errorMessage = error ? <ErrorMessage errStatus={ typeof error == 'number' ? error : 'unknown' }/> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} onUpdateChar={onUpdateChar}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({char, onUpdateChar}) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
            <Button onClick={onUpdateChar} outline size="lg" color="primary" block>next random Character</Button>
        </>
    )
}

