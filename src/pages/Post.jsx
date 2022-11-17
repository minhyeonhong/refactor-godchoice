import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import FestivalPost from '../components/post/FestivalPost';
import GatherPost from '../components/post/GatherPost';
import styled from 'styled-components';
const Post = () => {

    // 모집 구분글
    const [option, setOption] = useState();

    return (
        <Layout>
                <STSelect value="option" onChange={(e) => setOption(e.target.value)}
                style={{ width: "50%" }}>
                    <option>모집 구분</option>
                    <option value="행사글">행사글</option>
                    <option value="모집글">모집글</option>
                </STSelect>

                {option === "행사글" && (<FestivalPost />)}
                {option === "모집글" && (<GatherPost />)}
        </Layout>
    );
};

export default Post;

const STSelect = styled.select`
    font-size: 14px;
    background-color: #F4F4F4;
    width : 40%;
    border-radius: 10px;
    border : transparent;
    padding:5px;
    height : 32px;
`