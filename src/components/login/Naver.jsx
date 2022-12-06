import React from "react";
import PageState from "../common/PageState";
import { useQuery } from '@tanstack/react-query';
import { memberApis } from '../../api/api-functions/memberApis';

// 리다이렉트될 화면
const Naver = () => {
  // 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");

  useQuery(
    ['naverLogin', code],
    () => memberApis.naverLoginAX({ code, state }),
    {//options
      cacheTime: 3000,
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 1, // 실패시 재호출 몇번 할지
      onSuccess: res => {
        if (res.data.status === 200) {
          localStorage.setItem("token", res.headers.access_token);
          localStorage.setItem("refreshToken", res.headers.refresh_token);

          localStorage.setItem("role", res.data.data.role);
          localStorage.setItem("userAddressTag", res.data.data.userAddressTag);
          localStorage.setItem("userId", res.data.data.userId);
          localStorage.setItem("userImgUrl", res.data.data.userImgUrl);

          window.location.replace("/mypage")
        }
      },
      onError: res => {
        alert("로그인 실패");
        window.location.replace("/")
      }
    })

  return (
    <PageState display='flex' state='loading' imgWidth='25%' height='100vh'
      text='로그인 중입니다.' />
  );
};
export default Naver;