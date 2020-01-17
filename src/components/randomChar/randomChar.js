import React, {Component} from 'react';
import { Button } from 'reactstrap';

import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

import './randomChar.css';

export default class RandomChar extends Component {
    constructor(props) {
        super(props);

        this.updateChar = this.updateChar.bind(this);
        this.onError = this.props.onError;
    }

    gotService = new GotService();

    state = {
        char: {},
        error: false,
        errorStatus: null
    };
    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 2000);
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
            char
        })
    }
    noCharsId = [
        1509, 1510, 1511, 1995
    ];
    updateChar() {
        let id = Math.floor(Math.random()*2137 + 1);
        id = this.noCharsId.indexOf(id) > -1 ? Math.floor(Math.random()*2137 + 1) : id;
        // const id = 12300000;
        this.gotService.getCharacter(id)
            .then(res => this.onCharLoaded(res))
            .catch((err) => this.onError(err));
    }

    render() {
        const { char, error, errorStatus } = this.state;
        const onUpdateChar = this.updateChar;

        if (error) clearInterval(this.timerId);
        const errorMessage = error ? <ErrorMessage errStatus={ errorStatus }/> : null;
        const spinner = !(Object.keys(char).length || error) ? <Spinner /> : null;
        const content = !(error || spinner) ? <View char={char} onUpdateChar={onUpdateChar}/> : null;

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

