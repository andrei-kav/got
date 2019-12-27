import React from 'react';

import './header.css';

// вместо styled-components используем обычный css
// import styled from 'styled-components';
//
// const HeaderBlock = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     height: 80px;
// `;
//
// const HeaderTitle = styled.h3`
//     font-size: 24px;
//     color: #fff;
//     margin: 0;
// `;
//
// const HeaderLinks = styled.ul`
//     display: flex;
//     margin: 0;
//     align-items: center;
//     color: #fff;
//     list-style-type: none;
//     li {
//         margin-right: 20px;
//         font-size: 18px;
//     }
// `;

const Header = () => {
    return (
        <div className='header-menu'>
            <h3>
                <a href="#">
                    Game of Thrones DB
                </a>
            </h3>
            <ul>
                <li>
                    <a href="#">Characters</a>
                </li>
                <li>
                    <a href="#">Houses</a>
                </li>
                <li>
                    <a href="#">Books</a>   
                </li>
            </ul>
        </div>
    );
};

export default Header;