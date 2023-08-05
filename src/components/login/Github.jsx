import React from 'react';
import PageState from '../common/PageState';

const Github = () => {
    // 인가코드
    let code = new URL(window.location.href).searchParams.get('code');


    return (
        <PageState display='flex' state='loading' imgWidth='25%' height='100vh'
            text='로그인 중입니다.' />
    )
};

export default Github;