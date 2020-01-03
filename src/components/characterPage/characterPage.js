import React, { Component } from 'react';
import GotService from "../../services/gotService";

import ItemList from '../itemList';
import CharDetails, { Field } from '../charDetails';
import ErrorMessage from "../errorMessage";
import RowBlock from "../rowBlock";

export default class CharacterPage extends Component {

    constructor(props) {
        super(props);

        this.onItemSelected = this.onItemSelected.bind(this);
        this.onError = this.props.onError.bind(this);
    }

    gotService = new GotService();

    state = {
        selectedChar: null,
        error: false,
        errorStatus: null
    };
    componentDidCatch(info) {
        console.log('error charPage');
        this.setState({
            error: true
        })
    }
    onItemSelected(id) {
        this.setState({
            selectedChar: id
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
                      renderItem={({ name, gender }) => `${name} (${gender})`}/>
        );
        const charDetails = (
            <CharDetails charId={this.state.selectedChar}
                         onError={this.props.onError} >
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </CharDetails>
        );

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}