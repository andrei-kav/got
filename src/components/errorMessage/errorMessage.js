import React, { Component } from 'react';

import './errorMessage.css';

export default class ErrorMessage extends Component {

    render() {
        let { errStatus } = this.props;

        return (
            <>
                <img src={require(`./img/error${errStatus}.jpg`)} alt="error"/>
                <span>Something goes wrong. Error status - {errStatus}</span>
            </>
        )
    }
}


