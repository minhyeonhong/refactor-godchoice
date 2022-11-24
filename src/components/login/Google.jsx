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
      axios.get(`${process.env.REACT_APP_API_URL}/member/signup/google?code=${code}`)
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
