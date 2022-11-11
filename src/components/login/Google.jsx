import React, { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';


const Google = () => {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  const googleLogin = useCallback(async () => {
    try {
      const { data } = await axios.get(`http://3.38.255.232/member/signup/google?code=${code}`);

      localStorage.setItem('accessToken', data.user.accessToken);
    //   localStorage.setItem('refreshToken', data.user.refreshToken);
    //   localStorage.setItem('nickname', data.user.nickname);
    //   localStorage.setItem('userKey', data.user.userKey);

      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  }, [code]);

  useEffect(() => {
    googleLogin();
  }, [googleLogin]);

return (
	<H3>로그인 중입니다.</H3>
  )
};

export default Google;


const H3 = styled.h3`
	text-align: center;
`