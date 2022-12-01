import React, { useState, useEffect, useCallback } from "react";

import Layout from "../components/layout/Layout";
import List from "../components/home/List";
import Search from "../components/home/Search";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TopButton from "../components/elements/TopButton";
import ScrollToTop from "../components/elements/ScrollToTop";
// import AddPostButton from '../components/home/AddPostButton'
// import { useLocation } from "react-router-dom";
import WritingToggle from "../components/elements/WritingToggle";
import noImg from '../assets/images/common/noImg.jpg'

import { useDispatch, useSelector } from "react-redux";
import {
    putSearchState,
    putSearchStatePage,
    __getAllPostList,
    __postList,
    __getAdminPost
} from "../redux/modules/postSlice";
import { useMemo } from 'react';
import PageState from "../components/common/PageState";

import { postApis } from "../api/api-functions/postApis"
import { useQuery } from "@tanstack/react-query";

const Home = () => {
    const dispatch = useDispatch();

    //store state
    const { adminPosts, searchState, posts, istLastPage, isLoading, isResetSearch } = useSelector((state) => state.postSlice);
    const [page, setPage] = useState(0);


    //검색 상태 업데이트
    const updateSearchInfo = (searchInfo) => {
        dispatch(putSearchState({ main: searchState.main === undefined ? 'event' : searchState.main, ...searchInfo }));
    }
    const [modalOn, setModalOn] = useState(false);
    //페이지 업데이트
    useMemo(() => {
        dispatch(putSearchStatePage(page));
    }, [page])

    //리스트 불러오기
    useMemo(() => {
        if (Object.keys(searchState).length > 0) {
            dispatch(__getAllPostList(searchState));
        }
    }, [searchState])

    //배너 가져오기
    const banner = useQuery(['banner'], () => postApis.getAdminPostAX(), { refetchOnWindowFocus: false })

    // const result = useQuery(['todos', searchState], () => postApis.searchPostAX(searchState), { refetchOnWindowFocus: false })

    // console.log("result", result);

    return (

        <Layout>
            <PageState
                display={isLoading ? 'flex' : 'none'}
                state='loading' imgWidth='25%' height='100vh'
                text='잠시만 기다려 주세요.' />

            <StHomeWrap display={isLoading ? 'none' : 'block'}>
                <>
                    <ScrollToTop />
                    {modalOn && <WritingToggle modalOn={modalOn} setModalOn={setModalOn} />}
                    <TopButton modalOn={modalOn} setModalOn={setModalOn} />
                </>
                {/* 슬라이드 */}
                <StCarouselWrap>
                    <Carousel >
                        {banner?.data?.data?.data?.length === 0 ?
                            <Carousel.Item>
                                <PageState
                                    display='flex'
                                    state='notFound' imgWidth='25%' height='180px'
                                    text='등록된 배너가 없습니다.' />
                            </Carousel.Item>
                            :
                            banner?.data?.data?.data?.map((post) => {
                                return (
                                    <Carousel.Item key={post.id} onClick={() => { window.open(post.postLink, post.title) }}>
                                        <img style={{ height: "180px" }}
                                            className="d-block w-100"
                                            src={post.imgLink}
                                            alt="First slide"
                                        />
                                        <Carousel.Caption>
                                            <h3>{post.title}</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                )
                            })}
                    </Carousel>
                </StCarouselWrap>

                {/* 검색 */}
                <Search updateSearchInfo={updateSearchInfo} searchState={searchState} />

                {/* 리스트 */}
                <StTabBox>
                    <Tabs
                        defaultActiveKey="event"
                        id="justify-tab-example"
                        activeKey={searchState.main}
                        onSelect={(key) => dispatch(putSearchState({ ...searchState, main: key, page: 0 }))}
                        className="tabs"
                        justify
                    >
                        <Tab eventKey="event" title="행사글" />
                        <Tab eventKey="gather" title="모집글" />
                        <Tab eventKey="ask" title="질문글" />
                    </Tabs>
                    {/* 리스트 */}
                    <List posts={posts} main={searchState.main} isLoading={isLoading} setPage={setPage} istLastPage={istLastPage} />
                    <Deletes />
                </StTabBox>
            </StHomeWrap>
        </Layout >
    );
};

export default Home;

const Deletes = styled.div`
width: 100%;
`

const StHomeWrap = styled.div`
    display : ${(props) => props.display}
  //background-color: #FEFCF8;
`;

const StCarouselWrap = styled.div`
  .carousel-indicators [data-bs-target] {
    width: 3px;
    border-radius: 50%;
  }
  .carousel a {
    display: none;
  }
  .carousel-caption {
    right: 0%;
    text-align: inherit;
  }
`;
const StTabBox = styled.div`
  .tabs {
    margin: 0 10px;
  }
  .nav-link {
    color: #adaba9;
    font-weight: bold;
  }
  .nav-link.active {
    color: black;
    font-weight: bold;
  }
  .nav-link.active {
    color: black;
    font-weight: bold;
    border-bottom: 2px solid #3556e1;
  }
`;
