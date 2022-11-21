import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
:root{
    --vh: 100%;
  }

  * {
  margin:0;
  padding:0;
  font-family: 'Pretendard';
  
&::-webkit-scrollbar {
  display: none;
}
html,body{
  width:100vw;
  height:auto;
}
body {
  background: #F4F5F7;
  box-sizing: border-box;
  margin: 0 auto;
}
h1 {
  margin: 0;
  font-size: 32px;
}
h2 {
  margin: 0;
  font-size: 28px;
}
h3 {
  margin: 0;
  font-size: 24px;
}
ul {
  list-style: none;
}
p {
  margin: 0;
  font-family: 'Pretendard';
}
button {
  
cursor: pointer;
}
`;

export default GlobalStyle;