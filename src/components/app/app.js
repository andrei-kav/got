import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import GotService from "../../services/gotService";

import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage";
import ItemList from "../itemList";
import CharDetails from "../charDetails";

import './app.css';

export default class App extends Component {

    constructor() {
        super();

        this.onToggleRandomChar = this.onToggleRandomChar.bind(this);
    }

    gotService = new GotService();

    state = {
        hideRandomChar: false,
        error: false
    };
    hideRandomChar = 'hide Random Character component';
    showRandomChar = 'show Random Character component';

    componentDidCatch() {
        console.log('error app');
        this.setState({
            error:true
        })
    }

    onError(err) {
        this.setState({
            error: true,
            errorStatus: err.status
        });
    }

    onToggleRandomChar() {
        this.setState({
            hideRandomChar: !this.state.hideRandomChar
        })
    }

    render() {

        const { hideRandomChar } = this.state;
        const randomChar = !hideRandomChar ? <RandomChar onError={this.onError}/> : null;
        const randomCharButtonText = !hideRandomChar ? this.hideRandomChar : this.showRandomChar;

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <Button onClick={this.onToggleRandomChar} outline color="warning" size="lg" block>{randomCharButtonText}</Button>
                            {randomChar}
                        </Col>
                    </Row>
                    <CharacterPage onError={this.onError}/>
                    <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                                      getData={this.gotService.getAllBooks}
                                      renderItem={(item) => item.name}
                                      onError={this.onError} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}
                                         onError={this.onError} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                                      getData={this.gotService.getAllHouses}
                                      renderItem={(item) => item.name}
                                      onError={this.onError} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}
                                         onError={this.onError} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

};