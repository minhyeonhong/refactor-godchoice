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



const Detail = () => {
    const { url, postId } = useParams();
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.postSlice);


    useEffect(() => {
        if (url !== undefined && postId !== undefined) {
            dispatch(__getPost({ url, postId }));
        }
    }, [url, postId])

    useEffect(() => {
        console.log("post", post);
    }, [post])

    return (
        <Layout>
            {url === 'eventposts' && <Event post={post} />}
            {url === 'gatherposts' && <Gather post={post} />}
            {url === 'askposts' && <Ask post={post} />}
        </Layout>
    );
};

export default Detail;