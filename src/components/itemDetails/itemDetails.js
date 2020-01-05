import React, {Component} from 'react';

import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

import './itemDetails.css';

const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
};

export {
    Field
}

export default class ItemDetails extends Component {

    constructor(props) {
        super(props);

        this.onError = this.props.onError.bind(this);
    }

    state = {
        error: false,
        errorStatus: null,
        item: null
    };
    componentDidMount() {
        this.updateChar();
    }

    updateChar() {
        const { itemId, getData } = this.props;
        if (!itemId) return;
        getData(itemId)
            .then((item) => {
                this.setState({
                    item: item,
                    error: false,
                    errorStatus: null
                });
            })
            .catch((err) => this.onError(err));
        // this.foo.bar = 0;
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateChar();
        }
    }

    _renderItem(item) {
        const { name } = item;
        return (
            <>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </>
        )
    }
    render() {
        const { error, errorStatus, item } = this.state;
        const { itemDetailText } = this.props;

        const errorMessage = error ? <ErrorMessage errStatus={ errorStatus }/> : null;
        const spinner = !(item || error)
            ? <><div className='select-error'>{itemDetailText}</div><Spinner /></>
            : null;
        const itemView = !(error || spinner) ? this._renderItem(item) : null;

        return (
            <div className="item-details rounded">
                {errorMessage}
                {spinner}
                {itemView}
            </div>
        );
    }
}