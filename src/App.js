import React from 'react';
import { useEffect } from 'react';
import Router from "./shared/Router";
import GlobalStyle from './components/styles/GlobalStyle';
import styled from 'styled-components';

function App() {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

    return () => window.removeEventListener('resize', setScreenSize);
  });

  return (
    <>
      <Media>
      <GlobalStyle />
      <Router />
      </Media>
    </>
  );
}

export default App;


const Media = styled.div`
  @media screen and (max-width : 100vw) {
    width: 425px;
    height: 100%;
    border-radius: 0;
    box-shadow: 0px 0px 10px #ccc;
    margin: 0 auto;
  }
`