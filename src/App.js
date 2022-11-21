import React from 'react';
import { useEffect } from 'react';
import Router from "./shared/Router";
import GlobalStyle from './components/styles/GlobalStyle';

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
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
