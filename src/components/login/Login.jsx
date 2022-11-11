import { useDispatch } from "react-redux";
import styled from "styled-components";
// import Button from "components/elements/Button";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../../api/login";
import Kakao from "./Kakao";
import Naver from "./Naver";
// import { colors, fontSize } from "styles/theme";
// import icons from "assets";
import { __kakaoLogin } from "../../redux/modules/memberSlice";

const Login = () => {
  // const { LogoKakao, LogoGoogle, LogoNaver } = icons;
  const dispatch = useDispatch();

  return (
    <StLogin>
      <StLoginMessage>
        <StLoginTitle>
          안녕하세요. <br /> 
        </StLoginTitle>
        <StLoginContent>LOGIN</StLoginContent>
      </StLoginMessage>
      <StBtns>
        <button
          onClick={() => (window.location.href = KAKAO_AUTH_URL)}
        >
          <LogoKakao />
          카카오 계정으로 로그인
        </button>
        <button onClick={() => dispatch(__kakaoLogin('Jf8SsxW29OiPMjbzrGRqdHHwwzMVFlevJlfYELD4bte1-Do8SDVuLC3p2mA8ueevR7suKAo9cuoAAAGEZat_oQ'))}> 카카오 코드버튼</button>
        <div id="naverIdLogin">
                <Naver></Naver>
            </div>
        {/* <button
          onClick={() => (window.location.href = NAVER_AUTH_URL)}
        >
          <LogoNaver />
          네이버 계정으로 로그인
        </button> */}
        {/* <Button
          onClickHandler={() => (window.location.href = NAVER_AUTH_URL)}
        >
          <LogoNaver />
          네이버 계정으로 로그인
        </Button> */}
        <Button
          onClickHandler={() => (window.location.href = GOOGLE_AUTH_URL)}
        >
          <LogoGoogle />
          구글 계정으로 로그인
        </Button>
      </StBtns>
    </StLogin>
  );
};

const StLogin = styled.div`
  position: relative;
  top: 64px;
  padding: 0 35px;
  @media screen and (max-width: 350px) {
    padding: 0 15px;
  }
  height: calc(100vh - 64px);
`;
const StLoginMessage = styled.div`
  margin: 0 7px 60px 7px;
  padding-top: 70px;
`;

const StLoginTitle = styled.h2`
  font-weight: 400;
  span {
    font-family: "twayfly", "Noto Sans KR", sans-serif;
  }
`;

const StLoginContent = styled.span`
  margin-top: 10px;
`;

const StBtns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  button {
    text-align: center;
    position: relative;
    font-family: "twayfly", "Noto Sans KR", sans-serif;
    svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;



// ----------------- 여기부터 컴포넌트 만들고 교체할 것 ------------------

const Button = styled.button`
  border-radius: 20px;
`

const LogoKakao = styled.div`
  
`
const LogoNaver = styled.div`
  
`
const LogoGoogle = styled.div`
  
`



export default Login;