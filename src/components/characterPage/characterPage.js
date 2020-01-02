import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from "../errorMessage";

export default class CharacterPage extends Component {

    constructor(props) {
        super(props);

        this.onCharSelected = this.onCharSelected.bind(this);
        this.onError = this.props.onError.bind(this);
    }

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
    onCharSelected(id) {
        console.log(id);
        this.setState({
            selectedChar: id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <Row>
                <Col md='6'>
                    <ItemList onCharSelected={this.onCharSelected} onError={this.props.onError}/>
                </Col>
                <Col md='6'>
                    <CharDetails charId={this.state.selectedChar} onError={this.props.onError}/>
                </Col>
            </Row>
        )
    }
}