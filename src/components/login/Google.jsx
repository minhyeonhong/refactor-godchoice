import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../layout/Layout";
import axios from "axios";
import { setCookie } from "../../cookie/cookie";
import { useNavigate } from "react-router-dom";
import AlertModal from "../Modals/AlertModal";
import ErrorModal from "../Modals/ErrorModal";
import { useState } from "react";
import ImageLoading from "../elements/ImageLoading";

const Login = () => {
  const [modal, setModal] = React.useState(false);
  const [error, setError] = useState("");

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
  let code = new URL(window.location.href).searchParams.get("code");
  const getGoogleToken = async () => {
    try {
      // const data = await axios.get(`http://52.79.184.114/member/signup/google?code=${code}`);

      // console.log('data===> ', data)

      // if (data.headers.athorization) {
      //   setCookie("mycookie", data.headers.athorization);
      //   // setCookie("refreshToken", data.headers.refreshtoken);
      //   // setCookie("memberId", data.data.memberId);
      // }

      //  axios.get(`${process.env.REACT_APP_API_URL}/member/signup/google?code=${code}`)
       axios.get(`http://52.79.184.114/member/signup/google?code=${code}`)
        .then((res) => {
          console.log("넘어온 값", res); // 토큰이 넘어올 것임
          const Access_Token = res.headers.access_token;
          console.log(Access_Token)
        //   setCookie("token", Access_Token)
        // const Access_Token = res.headers.access_token;
        localStorage.setItem("token", Access_Token);
        localStorage.setItem("email", res.data.email);              
        localStorage.setItem("nickName", res.data.nickName);
        localStorage.setItem("userImg", res.data.userImg);

        console.log("토큰나와라 ===> ", localStorage.getItem("token"))

          window.location.replace("/mypage")
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
    if (code) {
    getGoogleToken();
  }
  }, [code]);

  return (
    <>
      <Layout>
        {error && <ErrorModal error="로그인 실패" navigation="/login" />}
        <ImageLoadingWrap>
          <ImageLoading color="rgba(0, 0, 0, 0.13)" />
        </ImageLoadingWrap>
        <CommunityBox>{modal && <AlertModal alertModalData={alertModalData} closeModal={modalOnOff} goAction={goAction}></AlertModal>}</CommunityBox>
      </Layout>
    </>
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
