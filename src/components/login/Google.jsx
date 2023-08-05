import React, { useEffect } from "react";
import PageState from "../common/PageState";
import { useQuery } from '@tanstack/react-query';

// 리다이렉트될 화면
const Google = () => {
  // 인가 코드
  let code = new URL(window.location.href).searchParams.get("code");


  return (
    <PageState display='flex' state='loading' imgWidth='25%' height='100vh'
      text='로그인 중입니다.' />
  );
};
export default Google;
