import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <StFooterWrap>
            <StCopyright>ⓒ 항해 E1I6</StCopyright>
        </StFooterWrap>
    );
};

export default Footer;

const StFooterWrap = styled.div`
    
`

const StCopyright = styled.span`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 400;
`;