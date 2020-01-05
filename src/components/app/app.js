import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";

import { CharactersPage, HousesPage, BooksPage, BooksItem } from '../pages';

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
            <Router>
                <div className="app">
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

                        <Route path='/characters' exact ><CharactersPage onError={this.onError} /></Route>
                        <Route path='/houses' exact ><HousesPage onError={this.onError} /></Route>
                        <Route path='/books' exact ><BooksPage onError={this.onError} /></Route>
                        <Route path='/books/:id' render={
                            ({ match, location, history }) => {
                                console.log(match);
                                console.log(location);
                                console.log(history);
                                const { id } = match.params;
                                return <BooksItem bookId={id} onError={this.onError} />
                            }
                        }/>

                    </Container>
                </div>
            </Router>
        );
    }

};