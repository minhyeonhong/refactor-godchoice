// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { setCookie, getCookie, delCookie } from "../../cookie/cookie";



// const NaverLogin = ({ setGetToken, setUserInfo }) => {

//     // const [user, setUser ] = useState(null);      

// 	const { naver } = window
// 	const NAVER_CLIENT_ID = "BeFF2BLXGHQ26lS7FEd0"; // 발급 받은 Client ID 입력 
// 	const NAVER_CALLBACK_URL = "http://3.38.255.232/member/signup/naver" // 작성했던 Callback URL 입력

// 	const initializeNaverLogin = () => {
// 		const naverLogin = new naver.LoginWithNaverId({
// 			clientId: NAVER_CLIENT_ID,
// 			callbackUrl: NAVER_CALLBACK_URL,
//           // 팝업창으로 로그인을 진행할 것인지?           
// 			isPopup: false,
//           // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
// 			loginButton: { color: 'green', type: 3, height: 58 },
// 			callbackHandle: true,
// 		})
// 		naverLogin.init()

//            // 선언된 naverLogin 을 이용하여 유저 (사용자) 정보를 불러오는데  
//            // 함수 내부에서 naverLogin을 선언하였기에 지역변수처리가 되어  
//            // userinfo 정보를 추출하는 것은 지역변수와 같은 함수에서 진행주어야한다.

//            // 아래와 같이 로그인한 유저 ( 사용자 ) 정보를 직접 접근하여 추출가능하다.
//            // 이때, 데이터는 첫 연동시 정보 동의한 데이터만 추출 가능하다.

//            // 백엔드 개발자가 정보를 전달해준다면 아래 요기! 라고 작성된 부분까지는 
//            // 코드 생략이 가능하다.  

//       naverLogin.getLoginStatus(async function (status) {
// 			if (status) {
//               // 아래처럼 선택하여 추출이 가능하고, 
// 				// const userid = naverLogin.user.getEmail()
// 				// const username = naverLogin.user.getName()
//               // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
//               setUserInfo(naverLogin.user)
// 			}
// 		})     
//             // 요기!
// 	}



//             // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 토큰이 붙어서 전달된다.
//             // 우선 아래와 같이 토큰을 추출 할 수 있으며,
//             // Redirect 페이지를 통해 빠르고, 깨끗하게 처리가 가능하다.

// 	    const userAccessToken = () => {
// 		    window.location.href.includes('access_token') && getToken()
// 	}

//       	const getToken = () => {
// 		const token = window.location.href.split('=')[1].split('&')[0]

//         console.log('토큰 =====> ', token)

//              // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!   
//                 // localStorage.setItem('access_token', token)
// 		        // setGetToken(token)
//                 setCookie('access_token', token)
//                 console.log("토큰값====>", getCookie('access_token'));
// 	}


//              // 화면 첫 렌더링이후 바로 실행하기k 위해 useEffect 를 사용하였다.
// 	useEffect(() => {
// 		initializeNaverLogin()
// 		userAccessToken()
// 	}, [])

//     //로그아웃 사용? 
//     // const naverLogout = () => {
//     //     localStorage.removeItem("com.naver.nid.access_token");
//     // };


// 	return (
// 		<>
//          {/* 구현할 위치에 아래와 같이 코드를 입력해주어야 한다.  */}
//          {/* 태그에 id="naverIdLogin" 를 해주지 않으면 오류가 발생한다! */}
// 			<div id="naverIdLogin"> </div>
//         {/* <button onClick={naverLogout}>Logout</button> */}
// 		</>
// 	)
// }

// export default NaverLogin;

import React, { useEffect } from "react";
import axios from "axios";
import { setCookie } from "../../cookie/cookie"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AlertModal from "../Modals/AlertModal";
import Layout from "../layout/Layout";
import ErrorModal from "../Modals/ErrorModal";
import { useState } from "react";
import ImageLoading from "../elements/ImageLoading";
import PageState from "../common/PageState";

const Login = () => {
  const [error, setError] = useState("");
  const [modal, setModal] = React.useState(false);
  const alertModalData = {
    title: "환영합니다",
    btn1: "확인",
  };
  const modalOnOff = () => {
    setModal(!modal);
  };
  const goAction = () => {
    /* 값이 있으면 그 값으로 페이지 이동 없으면 -1(뒤로가기) */
    const pathname = localStorage.getItem("pathname");
    localStorage.removeItem("pathname");
    pathname ? navigate(pathname, { replace: true }) : navigate("/mypage", { replace: true });
  };

  const navigate = useNavigate();


  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");
  const getNaverToken = async () => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/member/signup/naver?code=${code}&state=${state}`)
        .then((res) => {
          console.log("넘어온 값", res); // 토큰이 넘어올 것임
          const Access_Token = res.headers.access_token;
          const resData = res.data.data;

          localStorage.setItem("token", Access_Token);

          localStorage.setItem("role", resData.role);
          localStorage.setItem("userAddressTag", resData.userAddressTag);
          localStorage.setItem("userId", resData.userId);
          localStorage.setItem("userImgUrl", resData.userImgUrl);


          console.log("토큰나와라 ===> ", localStorage.getItem("token"))

          // window.location.replace("/mypage")
        }).catch((error) => {
          console.log("소셜로그인 에러", error);
          //window.alert("로그인에 실패하였습니다.");
          //   window.location.replace("/login");
        })

      modalOnOff();
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getNaverToken();
  }, []);


  return (
    <Layout>
      {error && <ErrorModal error="로그인 실패" navigation="/login" />}
      <PageState display='flex' state='loading' imgWidth='25%' height='100vh'
        text='로그인 중입니다.' />
    </Layout>
  );
};
export default Login;

const CommunityBox = styled.div`
  height: 100%;
  width: 390px;
  overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;

const ImageLoadingWrap = styled.div`
  align-items: center;
  align-content: center;
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
