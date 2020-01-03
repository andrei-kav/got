import React, { Component } from 'react';
import GotService from "../../../services/gotService";

import ErrorMessage from "../../errorMessage";
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import RowBlock from "../rowBlock";

export default class BooksPage extends Component {

    constructor(props) {
        super(props);

        this.onItemSelected = this.onItemSelected.bind(this);
    }

    gotService = new GotService();

    state = {
        selectedId: null,
        error: false,
        errorStatus: null
    };
    componentDidCatch(info) {
        console.log('error bookPage');
        this.setState({
            error: true
        })
    }
    _itemDetailText = 'Please select a book from list';
    onItemSelected(id) {
        this.setState({
            selectedId: id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList onItemSelected={this.onItemSelected}
                      onError={this.props.onError}
                      getData={this.gotService.getAllBooks}
                      renderItem={({ name, released }) => `${name} (${released})`} />
        );
        const itemDetails = (
            <ItemDetails itemId={this.state.selectedId}
                         onError={this.props.onError}
                         getData={this.gotService.getBook}
                         itemDetailText={this._itemDetailText} >
                <Field field='numberOfPages' label='Number Of Pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}