// import styled from "styled-components";
// import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../../api/login";
// import Kakao from "./Kakao";
// import NaverLogin from "./Naver";
// import { __kakaoLogin } from "../../redux/modules/memberSlice";

// const Login = () => {

//   return (
//     <StLogin>
//       <StLoginMessage>
//         <StLoginTitle>
//           안녕하세요. <br />
//         </StLoginTitle>
//         <StLoginContent>LOGIN</StLoginContent>
//       </StLoginMessage>
//       <StBtns>
//         <button
//           onClick={() => (window.location.href = KAKAO_AUTH_URL)}
//         >
//           <LogoKakao />
//           카카오 계정으로 로그인
//         </button>

//         <div id="naverIdLogin">
//           <NaverLogin></NaverLogin>
//         </div>
//         {/* <button
//           onClick={() => (window.location.href = NAVER_AUTH_URL)}
//         >
//           <LogoNaver />
//           네이버 계정으로 로그인
//         </button> */}
//         {/* <Button
//           onClickHandler={() => (window.location.href = NAVER_AUTH_URL)}
//         >
//           <LogoNaver />
//           네이버 계정으로 로그인
//         </Button> */}
//         <Button
//           onClickHandler={() => (window.location.href = GOOGLE_AUTH_URL)}
//         >
//           <LogoGoogle />
//           구글 계정으로 로그인
//         </Button>
//       </StBtns>
//     </StLogin>
//   );
// };

// const StLogin = styled.div`
//   position: relative;
//   top: 64px;
//   padding: 0 35px;
//   @media screen and (max-width: 350px) {
//     padding: 0 15px;
//   }
//   height: calc(100vh - 64px);
// `;
// const StLoginMessage = styled.div`
//   margin: 0 7px 60px 7px;
//   padding-top: 70px;
// `;

// const StLoginTitle = styled.h2`
//   font-weight: 400;
//   span {
//     font-family: "twayfly", "Noto Sans KR", sans-serif;
//   }
// `;

// const StLoginContent = styled.span`
//   margin-top: 10px;
// `;

// const StBtns = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 11px;
//   button {
//     text-align: center;
//     position: relative;
//     font-family: "twayfly", "Noto Sans KR", sans-serif;
//     svg {
//       position: absolute;
//       top: 0;
//       left: 0;
//     }
//   }
// `;



// // ----------------- 여기부터 컴포넌트 만들고 교체할 것 ------------------

// const Button = styled.button`
//   border-radius: 20px;
// `

// const LogoKakao = styled.div`
  
// `
// const LogoNaver = styled.div`
  
// `
// const LogoGoogle = styled.div`
  
// `


// export default Login;

import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../../api/login";
import kakao from "../../assets/logo_kakao.png";
import naver from "../../assets/logo_naver.png";
import google from "../../assets/logo_google.png";


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
          <Logo></Logo>
          <Button btnType="login" onClick={() => onClickHandler("k")}>
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
          </Button>
        </Container>
      </LoginWrap>
    </>
  );
};
export default Login;

const LoginWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 210px;
  height: 130px;
  margin-bottom: 100px;

  background-size: contain;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  box-sizing: border-box;
  padding: 0 20px;
  text-align: center;
`;

const LoginText = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */

  text-align: center;
  letter-spacing: -0.03em;

  color: #424242;
`;


