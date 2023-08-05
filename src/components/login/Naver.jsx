import React from "react";
import PageState from "../common/PageState";

// 리다이렉트될 화면
const Naver = () => {
  // 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");


  return (
    <PageState display='flex' state='loading' imgWidth='25%' height='100vh'
      text='로그인 중입니다.' />
  );
};
export default Naver;