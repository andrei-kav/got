import React, {Component} from 'react';

import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

import './itemList.css';


export default class ItemList extends Component {

    constructor(props) {
        super(props);

        this.onError = this.props.onError.bind(this);
    }

    // в state храним список персонажей
    state = {
        error: false,
        errorStatus: null,
        itemList: null
    };

    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
            .catch((err) => this.onError(err));
    }

    _renderItem(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label = this.props.renderItem(item);

            return (
                <li key={id}
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected(id) }>
                    {label}
                </li>
            )
        })
    }

    render() {
        const { itemList, error, errorStatus } = this.state;

        const errorMessage = error ? <ErrorMessage errStatus={ errorStatus }/> : null;
        const spinner = !(itemList || error) ? <Spinner /> : null;
        const items = !(error || spinner) ? this._renderItem(itemList) : null;

        return (
            <ul className="item-list list-group">
                {spinner}
                {items}
                {errorMessage}
            </ul>
        )
    }
}