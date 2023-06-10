import React, { useEffect, Fragment } from 'react';


import { useInView } from "react-intersection-observer"
import styled from 'styled-components';

import { BsEye } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { BookmarkFill } from "../../assets/index";
import PageState from '../common/PageState';
import { useInfiniteQuery } from '@tanstack/react-query';
import { postApis } from '../../api/api-functions/postApis';
import { getPosts } from '../../firestore/module/post';
import { useCallback } from 'react';
import { useState } from 'react';

const List = ({ searchState }) => {

    const navigate = useNavigate();
    const [ref, inView] = useInView();

    //리스트 받아오기
    // const result = useInfiniteQuery({
    //     queryKey: ['postList'],
    //     queryFn: ({ startAfterSnapshot }) => getPosts(searchState, startAfterSnapshot),
    //     getNextPageParam: ({ isLastPage, lastSnapshot }) => {
    //         if (!isLastPage) return lastSnapshot;
    //     },
    //     refetchOnWindowFocus: false,
    // })

    const [posts, setPosts] = useState();

    const getFirst = useCallback(async () => {
        try {
            const res = await getPosts(searchState, {});

            setPosts(res);
        } catch (error) {
            console.log("first error", error);
        }
    }, [getPosts]);

    const getNext = useCallback(async (param) => {
        try {
            const res = await getPosts(searchState, param);

            const obj = {
                datas: [...posts.datas, ...res.datas],
                isLastPage: res.isLastPage,
                lastSnapshot: res.lastSnapshot
            }

            setPosts(obj);
        } catch (error) {
            console.log("next error", error);
        }
    }, [posts?.lastSnapshot]);

    useEffect(() => {
        getFirst();
    }, [])

    useEffect(() => {
        console.log("posts", posts);
    }, [posts])


    useEffect(() => {
        if (posts === undefined) return;
        if (inView && !posts.isLastPage) {
            getNext(posts.lastSnapshot);
        }
    }, [inView, posts])

    // useEffect(() => {
    //     // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니고 다음페이지가 있다면
    //     if (inView && !result.isFetching && result.hasNextPage) {
    //         //console.log("nextFetch");
    //         result.fetchNextPage();
    //     }
    // }, [inView, result.isFetching])

    // useEffect(() => {
    //     //검색상태가 바뀌면 server state refetch
    //     if (!result.isFetching) result.refetch(searchState, 0);
    // }, [searchState])

    return (
        <StCardWrap>
            {/* <PageState display={result.data?.pages[0].datas.length === 0 ? 'flex' : 'none'} state='notFound' imgWidth='25%' height='60vh'
                text='리스트가 존재하지 않습니다.' /> */}
            <PageState display={posts?.datas.length === 0 ? 'flex' : 'none'} state='notFound' imgWidth='25%' height='60vh'
                text='리스트가 존재하지 않습니다.' />
            {/* {result.data?.pages.map((page, i) => (
                <Fragment key={i}> */}
            {posts?.datas.map((post) => (
                <StCardItem key={post.postID} onClick={() => { navigate(`/event/${post.postID}`) }}>
                    <StImgBox imgUrl={post.photoURIs[0]} >
                        {post.bookMarkStatus &&
                            <BookmarkFill style={{ margin: '4px 0 0 4px' }} />
                        }
                    </StImgBox>
                    <StContentBox>
                        <div className='titleBox'>{post.title.length > 10 ? post.title.substring(0, 9) + '...' : post.title}</div>
                        <div>{post.category}</div>
                        <div className='contentBox'>{post.content}</div>
                        <div className='dtateBox'>
                            <div>{post.endPeriod}</div>
                            <div className='lookBox'>{post.viewCount}&nbsp;<BsEye style={{ width: '16px', height: '16px', marginTop: '2px' }} /></div>
                        </div>
                    </StContentBox>
                </StCardItem>
            ))}
            {/* </Fragment>
            ))} */}
            {/* <PageState
                display={result.isFetching ? 'flex' : 'none'}
                state='notFound'
                imgWidth='25%'
                height=''
                flexDirection='row'
                text='검색중...' /> */}

            {/* {
                result.hasNextPage && <div ref={ref} />
            } */}

            {
                !posts?.isLastPage && <div ref={ref} />
            }
        </StCardWrap>
    );
};

export default List;

const StCardWrap = styled.div`
    gap: 5px;
    display: flex; 
    flex-direction: column;
`

const StCardItem = styled.div`
    display: flex;
    flex-direction: row;
    padding: 12px 16px;

    height: 154px;
    background: #FFFFFF;
`

const StImgBox = styled.div`
        width:130px;
        height:130px;
        background-size :contain;
        background-repeat: no-repeat;
        background-position: center center;
        background-image : url(${(props) => props.imgUrl});
        border-radius : 20px;
        border: 0.5px solid #F4F5F7;
`

const StContentBox = styled.div`
    flex : 2;
    margin-left : 20px;
    height: 130px;
    div {
        width : 100%;
        height : 25%;
    }
    .titleBox{
        font-weight : bold;
        font-size : 20px;
    }
    .contentBox {
        word-break: break-all;
    }
    .dtateBox{
        display : flex;
        justify-content : space-between;
        border-top : 1px solid #AEAEAE;
        font-size : 14px;
    }
    .lookBox {
        display : flex;
        justify-content : end;
    }
`