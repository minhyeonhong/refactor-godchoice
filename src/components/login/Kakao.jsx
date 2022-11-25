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
import PageState from '../common/PageState';


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

	return (
		<PageState display='flex' state='loading' imgWidth='25%' height='100vh'
			text='로그인 중입니다.' />
	)
};

export default Kakao;

const H3 = styled.h3`
	text-align: center;
`