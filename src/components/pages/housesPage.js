import React, { Component } from 'react';
import GotService from "../../services/gotService";

import ErrorMessage from "../errorMessage";
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import RowBlock from "../rowBlock";

export default class HousesPage extends Component {

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
        console.log('error houusePage');
        this.setState({
            error: true
        })
    }
    _itemDetailText = 'Please select a house from list';
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
                      getData={this.gotService.getAllHouses}
                      renderItem={({ name, region }) => `${name} (${region})`} />
        );
        const itemDetails = (
            <ItemDetails itemId={this.state.selectedId}
                         onError={this.props.onError}
                         getData={this.gotService.getHouse}
                         itemDetailText={this._itemDetailText} >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='overlord' label='Overlord'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}