import React, { Component } from 'react';
import GotService from "../../services/gotService";

import ErrorMessage from "../errorMessage";
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import RowBlock from "../rowBlock";

export default class CharactersPage extends Component {

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
        console.log('error charPage');
        this.setState({
            error: true
        })
    }
    _itemDetailText = 'Please select a character from list';
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
                      getData={this.gotService.getAllCharacters}
                      renderItem={({ name, gender }) => `${name} (${gender})`} />
        );
        const itemDetails = (
            <ItemDetails itemId={this.state.selectedId}
                         onError={this.props.onError}
                         getData={this.gotService.getCharacter}
                         itemDetailText={this._itemDetailText} >
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}