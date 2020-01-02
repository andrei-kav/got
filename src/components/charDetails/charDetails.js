import React, {Component} from 'react';
import GotService from "../../services/gotService";

import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

import './charDetails.css';

export default class CharDetails extends Component {

    constructor(props) {
        super(props);

        this.onError = this.props.onError.bind(this);
    }

    gotService = new GotService();

    state = {
        error: false,
        errorStatus: null,
        char: null
    };
    componentDidMount() {
        this.updateChar();
    }

    updateChar() {
        const { charId } = this.props;
        if (!charId) return;
        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({
                    char
                });
            })
            .catch((err) => this.onError(err));
        // this.foo.bar = 0;
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
            this.setState({
                error: false,
                errorStatus: null
            });
        }
    }

    _renderItem(char) {
        const { name, gender, born, died, culture } = char;
        return (
            <>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </>
        )
    }
    render() {
        const { error, errorStatus, char } = this.state;

        const errorMessage = error ? <ErrorMessage errStatus={ errorStatus }/> : null;
        const spinner = !(char || error) ? <>
            <div className='select-error'>Please select a character</div>
            <Spinner />
            </> : null;
        const item = !(error || spinner) ? this._renderItem(char) : null;

        return (
            <div className="char-details rounded">
                {errorMessage}
                {spinner}
                {item}
            </div>
        );
    }
}