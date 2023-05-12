import React, { useEffect } from 'react';
import PageState from '../common/PageState';
import { useQuery } from '@tanstack/react-query';
import { memberApis } from '../../api/api-functions/memberApis';
import axios from 'axios';

// 리다이렉트될 화면
const Kakao = () => {

	// 인가코드
	let code = new URL(window.location.href).searchParams.get('code');

	const kakaoLogin = async () => {

		const params = new URLSearchParams();

		params.append("grant_type", "authorization_code");
		params.append("client_id", process.env.REACT_APP_KAKAO_REST_API_KEY);
		params.append("redirect_uri", process.env.REACT_APP_KAKAO_REDIRECT_URI);
		params.append("code", code);

		return await axios.post('https://kauth.kakao.com/oauth/token', params)
	}

	useQuery(
		['kakaoLogin', code],
		() => kakaoLogin(),
		{//options
			refetchOnWindowFocus: false,
			onSuccess: res => {
				console.log(res)
				if (res.status === 200) {
					localStorage.setItem("token", res.data.access_token);
					localStorage.setItem("expiresIn", res.data.expires_in);
					localStorage.setItem("refreshToken", res.data.refresh_token);
					localStorage.setItem("refreshTokenExpiresIn", res.data.refresh_token_expires_in);
					localStorage.setItem("scope", res.data.scope);
					localStorage.setItem("tokenType", res.data.token_type);

					window.location.replace("/mypage");
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
	)
};

export default Kakao;
