import React, { Component } from 'react';

import './errorMessage.css';

export default class ErrorMessage extends Component {

    processedErrStatuses = [
        404, 408, 410
    ];

    render() {
        let errStatus = this.props.errStatus;
        let errText = this.processedErrStatuses.indexOf(errStatus) > -1 ? errStatus : 'unknown';
        errStatus = errStatus ? errStatus : errText;

        return (
            <>
                <img className='img-error' src={require(`./img/error${errText}.jpg`)} alt="error"/>
                <span>Something goes wrong. Error status - {errStatus}</span>
            </>
        )
    }
}


