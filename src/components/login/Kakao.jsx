import React, { useEffect } from 'react';
import PageState from '../common/PageState';
import { useQuery } from '@tanstack/react-query';
import { memberApis } from '../../api/api-functions/memberApis';

// 리다이렉트될 화면
const Kakao = () => {

	// 인가코드
	let code = new URL(window.location.href).searchParams.get('code');

	useEffect(() => {
		fetch('https://kauth.kakao.com/oauth/token', {
			method: 'POST',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
			body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code}`
		}).then((res) => res.json())
			.then(data => {
				console.log(data)
			})
			.catch((err) => {
				console.log("err", err);

			})
	}, [])

	// useQuery(
	// 	['kakaoLogin', code],
	// 	() => memberApis.kakaoLoginAX(code),
	// 	{//options
	// 		refetchOnWindowFocus: false,
	// 		onSuccess: res => {
	// 			if (res.data.status === 200) {
	// 				localStorage.setItem("token", res.headers.access_token);
	// 				localStorage.setItem("refreshToken", res.headers.refresh_token);

	// 				localStorage.setItem("role", res.data.data.role);
	// 				localStorage.setItem("userAddressTag", res.data.data.userAddressTag);
	// 				localStorage.setItem("userId", res.data.data.userId);
	// 				localStorage.setItem("userImgUrl", res.data.data.userImgUrl);

	// 				window.location.replace("/mypage");
	// 			}
	// 		},
	// 		onError: res => {
	// 			alert("로그인 실패");
	// 			window.location.replace("/")
	// 		}
	// 	})

	return (
		<PageState display='flex' state='loading' imgWidth='25%' height='100vh'
			text='로그인 중입니다.' />
	)
};

export default Kakao;
