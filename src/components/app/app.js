import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';

import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage";

import './app.css';

export default class App extends Component {

    constructor() {
        super();

        this.onToggleRandomChar = this.onToggleRandomChar.bind(this);
    }

    state = {
        hideRandomChar: false,
        error: false
    };
    hideRandomChar = 'hide Random Character component';
    showRandomChar = 'show Random Character component';

    componentDidCatch() {
        console.log('error has been');
        this.setState({
            error:true
        })
    }

    onToggleRandomChar() {
        this.setState({
            hideRandomChar: !this.state.hideRandomChar
        })
    }

    render() {

        const { hideRandomChar } = this.state;
        const randomChar = !hideRandomChar ? <RandomChar/> : null;
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
                    <CharacterPage />
                </Container>
            </>
        );
    }

};