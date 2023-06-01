import React from 'react';
import Layout from '../components/layout/Layout';

import Event from '../components/detail/Event';
import Gather from '../components/detail/Gather';
import Ask from '../components/detail/Ask';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Detail = () => {
    const { url, postId } = useParams();

    useEffect(() => {
        if (localStorage.getItem("uid") === null || localStorage.getItem('uid').trim() === '') {
            alert('로그인 해주세요.');
            window.location.replace('/login');
        }
    }, [])

    return (
        <Layout>
            {url === 'event' && <Event postId={postId} url={url} />}
            {url === 'gather' && <Gather postId={postId} url={url} />}
            {url === 'ask' && <Ask postId={postId} url={url} />}
        </Layout>
    );
};

export default Detail;