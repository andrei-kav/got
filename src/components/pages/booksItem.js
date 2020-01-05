import React, { Component } from 'react';

import GotService from "../../services/gotService";
import ItemDetails, { Field } from '../itemDetails';

export default class BooksItem extends Component {

    gotService = new GotService();

    render() {
        return (
            <ItemDetails itemId={this.props.bookId}
                         onError={this.props.onError}
                         getData={this.gotService.getBook}
                         itemDetailText={this._itemDetailText} >
                <Field field='numberOfPages' label='Number Of Pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}