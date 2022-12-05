import React, { useState, useMemo } from "react";

import Layout from "../components/layout/Layout";
import List from "../components/home/List";
import Search from "../components/home/Search";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TopButton from "../components/elements/TopButton";
import ScrollToTop from "../components/elements/ScrollToTop";
import WritingToggle from "../components/elements/WritingToggle";

import PageState from "../components/common/PageState";

import { postApis } from "../api/api-functions/postApis"
import { useQuery } from "@tanstack/react-query";
import useInput from "../hooks/useInput";

const Home = () => {

    //배너 가져오기
    const banner = useQuery(['banner'], () => postApis.getAdminPostAX(), { refetchOnWindowFocus: false, retry: 0 })

    //유저 지역정보 가져오기
    const userAddressTag = localStorage.getItem('userAddressTag');
    //client 검색 state
    const [searchState, setSearchState] = useState({
        main: "event",
        tag: userAddressTag !== null && userAddressTag !== 'null' ? [userAddressTag] : [],
        progress: '진행중',
        sort: '최신순',
        search: '',
    });
    //검색어 state
    const [search, setSearch, searchHandle] = useInput({ search: '' });
    //검색어로 검색후 검색어를 지웠을때 처리
    useMemo(() => {
        if (search.search === "") {
            setSearchState({ ...searchState, search: search.search });
        }
    }, [search.search])

    //모달
    const [modalOn, setModalOn] = useState(false);

    return (

        <Layout>
            <StHomeWrap>
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
                <Search searchState={searchState} setSearchState={setSearchState} search={search} searchHandle={searchHandle} />

                {/* 리스트 */}
                <StTabBox>
                    <Tabs
                        defaultActiveKey="event"
                        id="justify-tab-example"
                        activeKey={searchState.main}
                        onSelect={(key) => setSearchState({ ...searchState, main: key, page: 0 })}
                        className="tabs"
                        justify
                    >
                        <Tab eventKey="event" title="행사글" />
                        <Tab eventKey="gather" title="모집글" />
                        <Tab eventKey="ask" title="질문글" />
                    </Tabs>
                    {/* 리스트 */}
                    <List searchState={searchState} />
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
  /* .carousel a {
    display: none;
  } */
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
