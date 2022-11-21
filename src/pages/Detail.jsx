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

const Detail = () => {
    const { url, postId } = useParams();
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.postSlice);

    //업데이트 인풋
    const [modPost, setmodPost, modPostHandle] = useInput();

    useEffect(() => {
        if (url !== undefined && postId !== undefined) {
            dispatch(__getPost({ url, postId }));
        }
    }, [url, postId])

    useEffect(() => {
        if (Object.keys(post).length > 0) {
            console.log("post", post);
            setmodPost(post);
        }
    }, [post])

    return (
        <Layout>
            {url === 'eventposts' && <Event post={post} postId={postId} modPost={modPost} setmodPost={setmodPost} modPostHandle={modPostHandle} />}
            {url === 'gatherposts' && <Gather post={post} postId={postId} modPost={modPost} setmodPost={setmodPost} modPostHandle={modPostHandle}/>}
            {url === 'askposts' && <Ask post={post} postId={postId} modPost={modPost} setmodPost={setmodPost} modPostHandle={modPostHandle} />}
        </Layout>
    );
};

export default Detail;