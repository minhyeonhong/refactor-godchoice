import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

import Event from '../components/detail/Event';
import Gather from '../components/detail/Gather';
import Ask from '../components/detail/Ask';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getPost } from '../redux/modules/postSlice';

import useInput from "../hooks/useInput";
import PageState from '../components/common/PageState';

import { postApis } from "../api/api-functions/postApis"
import { useQuery } from "@tanstack/react-query";


const Detail = () => {
    const { url, postId } = useParams();

    //업데이트 인풋
    const [modPost, setmodPost, modPostHandle] = useInput();
    //디테일 페이지 server state
    const detail = useQuery(['detail', { url, postId }], //key
        () => postApis.getPostAX({ url, postId }), //fn
        {//options
            refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
            retry: 0, // 실패시 재호출 몇번 할지
            onSuccess: res => { // 성공시 호출
                setmodPost(res.data.data);
            }
        })

    useEffect(() => {
        if (localStorage.getItem('token') === null || localStorage.getItem('token').trim() === 'null' ||
            localStorage.getItem('token') === undefined || localStorage.getItem('token').trim() === '') {
            alert('로그인 해주세요.');
            window.location.replace('/login');
        }
    }, [])

    return (
        <Layout>
            <PageState
                display={detail?.isLoading ? 'flex' : 'none'}
                state='loading' imgWidth='25%' height='100vh'
                text='잠시만 기다려 주세요.' />
            <PageState display={detail?.isSuccess ? 'none' : 'flex'}
                flexDirection='column' state='notFound' imgWidth='25%' height='100vh'
                text='해당 페이지를 찾을 수 없습니다.' />
            {detail?.isSuccess && url === 'eventposts' && <Event post={detail.data.data.data} postId={postId} modPost={modPost} setmodPost={setmodPost} modPostHandle={modPostHandle} />}
            {detail?.isSuccess && url === 'gatherposts' && <Gather post={detail.data.data.data} postId={postId} modPost={modPost} setmodPost={setmodPost} modPostHandle={modPostHandle} />}
            {detail?.isSuccess && url === 'askposts' && <Ask post={detail.data.data.data} postId={postId} modPost={modPost} setmodPost={setmodPost} modPostHandle={modPostHandle} />}

        </Layout>
    );
};

export default Detail;