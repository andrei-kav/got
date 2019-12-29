import React from 'react';

import './errorMessage.css';

const ErrorMessage = () => {
    return (
        <>
            <img src={require('./img/error-01.jpg')} alt="error"/>
            <span>Something goes wrong</span>
        </>
    )
};

export default ErrorMessage;

