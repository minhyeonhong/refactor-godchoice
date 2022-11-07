import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
    return (
        <div>
            <Header />
            <StBody>
                {props.children}
            </StBody>
            <Footer />
        </div>
    );
};

export default Layout;

const StBody = styled.div`
    min-height : 100vh;
    height: 100%;
`