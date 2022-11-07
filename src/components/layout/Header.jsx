import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <StHeaderWrap>
            헤더입니다
        </StHeaderWrap>
    );
};

export default Header;

const StHeaderWrap = styled.div`
    position:sticky;
    top : 0;  
    background-color : red;
    z-index : 1;
`