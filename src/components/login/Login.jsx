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
          {/* <Button btnType="login" onClick={() => onClickHandler("k")}>
            <div>
              <img src={kakao} alt="kakao_img" />
            </div>
            <LoginText>카카오 로그인</LoginText>
          </Button>
          <Button btnType="login" onClick={() => onClickHandler("n")}>
            <div>
              <img src={naver} alt="naver_img" />
            </div>
            <LoginText>네이버 로그인</LoginText>
          </Button>
          <Button btnType="login" onClick={() => onClickHandler("g")}>
            <div>
              <img src={google} alt="google_img" />
            </div>
            <LoginText>구글 로그인</LoginText>
          </Button> */}
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


