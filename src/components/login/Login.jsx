import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../../api/login";
import { flexColumn } from "../styles/Flex";
import { GoogleBtn, KakaoBtn, NaverBtn } from "../../assets";

import logo from "../../assets/images/common/logo.png"



const Login = () => {

  const onClickHandler = (flag) => {
    if (flag === "k") {
      window.location.href = KAKAO_AUTH_URL;
    } else if (flag === "n") {
      window.location.href = NAVER_AUTH_URL;
    } else if (flag === "g") {
      window.location.href = GOOGLE_AUTH_URL;
    }
  };
  return (
    <>
      <LoginWrap>
        <Container>
          <Logo> <img src={logo} alt="logo" /> </Logo>
          <KakaoBtn style={{width : "100%"}} onClick={() => onClickHandler("k")} />
          <NaverBtn style={{width : "100%"}} onClick={() => onClickHandler("n")} />
          <GoogleBtn style={{width : "100%"}} onClick={() => onClickHandler("g")} />
        </Container>
      </LoginWrap>
    </>
  ); 
};
export default Login;

const LoginWrap = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  ${flexColumn}
  align-items: center;
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 130px;
  margin: 100px auto;
`;
const Container = styled.div`
  width: 100%;
  ${flexColumn}
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 0 20px;
  text-align: center;
`;


