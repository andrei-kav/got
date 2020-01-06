import React from "react";
import { Button } from "reactstrap";
import { withRouter } from 'react-router-dom';

import './page404.css'


const Page404 = ({ url, goBack, goHome }) => {

    return (
        <>
            <div className="page-404 rounded">
                <h3>Such url "{url}" does not exist</h3>
                <img className='img-error' src={require(`../errorMessage/img/error404.jpg`)} alt="error"/>
            </div>
            <Button onClick={goBack} color="primary" size="lg" block>go back in the history stack</Button>
            <Button onClick={goHome} color="primary" size="lg" block>go home and rest</Button>
        </>
    )
}

export default withRouter(Page404);