import React, {Component} from 'react';
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

import './itemList.css';


export default class ItemList extends Component {

    constructor(props) {
        super(props);

        this.onError = this.props.onError.bind(this);
    }

    gotService = new GotService();

    // в state храним список персонажей
    state = {
        error: false,
        errorStatus: null,
        charList: null
    };

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
            .catch((err) => this.onError(err));
    }

    _renderItem(arr) {
        return arr.map((item, i) => {
            return (
                <li key={item.id}
                    className="list-group-item"
                    onClick={ () => this.props.onCharSelected(item.id) }>
                    {item.name}
                </li>
            )
        })
    }

    render() {
        const { charList, error, errorStatus } = this.state;

        const errorMessage = error ? <ErrorMessage errStatus={ errorStatus }/> : null;
        const spinner = !(charList || error) ? <Spinner /> : null;
        const items = !(error || spinner) ? this._renderItem(charList) : null;

        return (
            <ul className="item-list list-group">
                {spinner}
                {items}
                {errorMessage}
            </ul>
        )
    }
}