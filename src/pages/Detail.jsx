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

const Detail = () => {
    const { url, postId } = useParams();
    const dispatch = useDispatch();
    const { post, isLoading } = useSelector((state) => state.postSlice);


    //업데이트 인풋
    const [modPost, setmodPost, modPostHandle] = useInput();

    useEffect(() => {
        if (url !== undefined && postId !== undefined) {
            dispatch(__getPost({ url, postId }));
        }
    }, [url, postId])

    useEffect(() => {
        if (Object.keys(post).length > 0) {
            setmodPost(post);
        }
    }, [post])

    useEffect(() => {
        if (localStorage.getItem('token') === null || localStorage.getItem('token') === 'null' ||
            localStorage.getItem('token') === undefined || localStorage.getItem('token') === '') {
            alert('로그인 해주세요.');
            window.location.replace('/login');
        }
    }, [])

    return (
        <Layout>
            <PageState
                display={isLoading ? 'flex' : 'none'}
                state='loading' imgWidth='25%' height='100vh'
                text='잠시만 기다려 주세요.' />
            <PageState display={Object.keys(post).length > 0 ? 'none' : 'flex'}
                flexDirection='column' state='notFound' imgWidth='25%' height='100vh'
                text='해당 페이지를 찾을 수 없습니다.' />
            {url === 'eventposts' && <Event post={post} postId={postId} modPost={modPost} setmodPost={setmodPost} modPostHandle={modPostHandle} />}
            {url === 'gatherposts' && <Gather post={post} postId={postId} modPost={modPost} setmodPost={setmodPost} modPostHandle={modPostHandle} />}
            {url === 'askposts' && <Ask post={post} postId={postId} modPost={modPost} setmodPost={setmodPost} modPostHandle={modPostHandle} />}
        </Layout>
    );
};

export default Detail;