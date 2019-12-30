import React, { Component } from 'react';

import './errorMessage.css';

export default class ErrorMessage extends Component {

    render() {
        const { errStatus } = this.props;
        return (
            <>
                <img src={require(`./img/error${errStatus}.jpg`)} alt="error"/>
                <span>Something goes wrong {errStatus}</span>
            </>
        )
    }
}


