// 리다이렉트될 화면

import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { __kakaoLogin } from '../../redux/modules/memberSlice';
// import { Cookies } from 'react-cookie';
// import { setCookie } from '../../cookie/cookie';
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../../api/login";
import { useDispatch } from 'react-redux';


const Kakao = () => {

	// 인가코드
	let code = new URL(window.location.href).searchParams.get('code');
	// const cookies = new Cookies();
	// const navigate = useNavigate();
	const dispatch = useDispatch();


	useEffect(() => {
		if (code) {
			dispatch(__kakaoLogin(code));
		}
	}, [code])

	// useEffect(async () => {
	// 	console.log("code", code)
	// 	await dispatch(__kakaoLogin(code));
	// }, [code]);

	return (
		<H3>로그인 중입니다.</H3>
	)




	// useEffect(() => {
	// 	if (!!code) {
	// 		api
	// 			.get(`/oauth/callback/kakao?code=${code}`)
	// 			.then((res) => {
	// 				if (res.data.success === true) {
	// 					return (
	// 						localStorage.setItem('userId', res.data.result.userId),
	// 						localStorage.setItem('memberId', res.data.result.id),
	// 						localStorage.setItem('accessToken', res.headers.authorization),
	// 						setCookie('refreshToken', res.headers[`refresh-token`]),
	// 						navigate(`/`)
	// 					);
	// 				}
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	}
	// }, [code]);
	// return <></>;


};

export default Kakao;

const H3 = styled.h3`
	text-align: center;
`