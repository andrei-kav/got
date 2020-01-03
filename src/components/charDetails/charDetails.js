import React, {Component} from 'react';
import GotService from "../../services/gotService";

import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

import './charDetails.css';

const Field = ({ char, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
};

export {
    Field
}

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
        const { name } = char;
        return (
            <>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {char})
                        })
                    }
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