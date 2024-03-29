import React, { useEffect, Fragment } from 'react';


import { useInView } from "react-intersection-observer"
import styled from 'styled-components';

import { BsEye } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { BookmarkFill } from "../../assets/index";
import PageState from '../common/PageState';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '../../firestore/module/post';
import { today } from '../common/Date';

const List = ({ searchState }) => {

    const navigate = useNavigate();
    const [ref, inView] = useInView();

    //리스트 받아오기
    const result = useInfiniteQuery({
        queryKey: ['postList'],
        queryFn: ({ pageParam }) => getPosts(searchState, pageParam),
        getNextPageParam: ({ isLastPage, lastSnapshot }) => {
            if (!isLastPage) return lastSnapshot;
        },
        refetchOnWindowFocus: false,
    })

    const posts = result.data?.pages.flat(Infinity).map(posts => posts.datas).flat(Infinity);

    const postsLength = posts.filter(post => post.contentType === searchState.main)
        .filter(post => {
            if (post.contentType === "event") {
                return searchState.progress === "진행중" ? post.endPeriod >= today : post.endPeriod < today
            } else if (post.contentType === "gather") {
                return searchState.progress === "진행중" ? post.dateToMeet >= today : post.dateToMeet < today
            } else {
                return post
            }
        }).length;

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니고 다음페이지가 있다면
        if (inView && !result.isFetching && result.hasNextPage) {
            result.fetchNextPage();
        }
    }, [inView, result.isFetching])

    return (
        <StCardWrap>
            <PageState display={posts.length === 0 && postsLength === 0 ? 'flex' : 'none'} state='notFound' imgWidth='25%' height='60vh'
                text='리스트가 존재하지 않습니다.' />
            {(searchState.sort === "최신순" ?
                posts.sort((a, b) => (new Date(b.writeTime) - new Date(a.writeTime)))
                :
                posts.sort((a, b) => (b.viewUsers.length - a.viewUsers.length))
            )
                .filter((post) =>
                    post.title.toUpperCase()
                        .includes((searchState.search || '').toUpperCase())
                )
                .filter((post) =>
                    searchState.tag.length > 0 ?
                        searchState.tag.includes(post.postAddress.substring(0, 2))
                        :
                        post
                )
                .filter((post) =>
                    post.contentType === "ask" ? post : searchState.progress === "진행중" ?
                        post.endPeriod >= today || post.dateToMeet >= today
                        :
                        post.endPeriod < today || post.dateToMeet < today
                )
                .filter((post) => post.contentType === searchState.main)
                .map((post) => (
                    <Fragment key={post.postID}>
                        <StCardItem onClick={() => { navigate(`/${post.contentType}/${post.postID}`) }}>
                            <StImgBox imgUrl={post.photoURIs[0] || `${process.env.PUBLIC_URL}/No_Image_Available.jpg`} >
                                {post.scrapUsers.includes(localStorage.getItem('uid')) &&
                                    <BookmarkFill style={{ margin: '4px 0 0 4px' }} />
                                }
                            </StImgBox>
                            <StContentBox>
                                <div className='titleBox'>{post.title.length > 10 ? post.title.substring(0, 9) + '...' : post.title}</div>
                                <div>{post.category}</div>
                                <div className='contentBox'>{post.content.length > 10 ? post.content.substring(0, 9) + '...' : post.content}</div>
                                <div className='dtateBox'>
                                    {post.contentType === "event" && <div>{post.endPeriod}</div>}
                                    {post.contentType === "gather" && <div>{post.dateToMeet}</div>}
                                    {post.contentType === "ask" && <div>{post.writeTime.split(" ")[0]}</div>}
                                    <div className='lookBox'>{
                                        post.viewUsers.length
                                    }&nbsp;<BsEye style={{ width: '16px', height: '16px', marginTop: '2px' }} /></div>
                                </div>
                            </StContentBox>
                        </StCardItem>
                    </Fragment>
                ))}
            <PageState
                display={result.isFetching ? 'flex' : 'none'}
                state='notFound'
                imgWidth='25%'
                height=''
                flexDirection='row'
                text='검색중...' />
            {
                result.hasNextPage && <div ref={ref} />
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