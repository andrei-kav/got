import React, { Component } from 'react';
import GotService from "../../services/gotService";
import { withRouter } from 'react-router-dom';

import ErrorMessage from "../errorMessage";
import ItemList from '../itemList';

class BooksPage extends Component {

    gotService = new GotService();

    state = {
        error: false,
        errorStatus: null
    };
    componentDidCatch(info) {
        console.log('error bookPage');
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <ItemList onItemSelected={(itemId) => {
                this.props.history.push(itemId);
            }}
                      onError={this.props.onError}
                      getData={this.gotService.getAllBooks}
                      renderItem={({ name, released }) => `${name} (released ${released})`} />
        )
    }
}

export default withRouter(BooksPage);