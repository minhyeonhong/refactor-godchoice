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

// 가이드 모달
import { flexColumn, flexRow } from "../components/styles/Flex";
import { Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination} from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css"
import "swiper/css/navigation";
import "swiper/css/pagination";


import guide01 from "../assets/images/banner/guide/guide_01.jpg"
import guide02 from "../assets/images/banner/guide/guide_02.jpg"
import guide03 from "../assets/images/banner/guide/guide_03.jpg"
import guide04 from "../assets/images/banner/guide/guide_04.jpg"

SwiperCore.use([Pagination, Autoplay, Navigation]);
// ------------- 여기까지 ---------------

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

    // 가이드 모달
    const [ guideOn, setGuideOn ] = useState(false);
    const guides = [guide01, guide02, guide03, guide04 ];
    // ------------- 여기까지 ---------------
    
    
    
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
          display={isLoading ? "flex" : "none"}
          state="loading"
          imgWidth="25%"
          height="100vh"
          text="잠시만 기다려 주세요."
        />

        <StHomeWrap display={isLoading ? "none" : "block"}>
          <>
            <ScrollToTop />
            {modalOn && (
              <WritingToggle modalOn={modalOn} setModalOn={setModalOn} />
            )}
            <TopButton modalOn={modalOn} setModalOn={setModalOn} />

            {/* 임시 배너 모달! -- 수정할 것 */}
            <BannerModal
              onClick={() => {
                setGuideOn(!guideOn);
                console.log("guideOn ===> ", guideOn);
              }}
            >
              배너 모달
            </BannerModal>

            {guideOn && (
              <Dim
                onClick={() => {
                  setGuideOn(!guideOn);
                }}
              >
                <StyleGuide onClick={(e) => e.stopPropagation()}>
                  <StyledSwiper
                    className="swipe"
                    spaceBetween={0}
                    slidesPerView={1}
                    scrollbar={{ draggable: true }}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 15000, disableOnInteraction: false }}
                    loop={true}
                    centeredSlides={true}
                    style={{ backgroundColor: "pink" }}
                  >
                    {guides?.map((guide, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <ItemDetailImg src={guide} />
                        </SwiperSlide>
                      );
                    })}
                  </StyledSwiper>
                  {/* StyledSwiper */}

                  <button
                    onClick={() => {
                      setGuideOn(!guideOn);
                    }}
                  >
                    X
                  </button>
                </StyleGuide>
              </Dim>
            )}

            {/* ---------- 여기까지 ---------- */}
          </>

          {/* 슬라이드 */}
          <StCarouselWrap>
            <Carousel>
              {banner?.data?.data?.data?.length === 0 ? (
                <Carousel.Item>
                  <PageState
                    display="flex"
                    state="notFound"
                    imgWidth="25%"
                    height="180px"
                    text="등록된 배너가 없습니다."
                  />
                </Carousel.Item>
              ) : (
                banner?.data?.data?.data?.map((post) => {
                  return (
                    <Carousel.Item
                      key={post.id}
                      onClick={() => {
                        window.open(post.postLink, post.title);
                      }}
                    >
                      <img
                        style={{ height: "180px" }}
                        className="d-block w-100"
                        src={post.imgLink}
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h3>{post.title}</h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })
              )}
            </Carousel>
          </StCarouselWrap>

          {/* 검색 */}
          <Search
            updateSearchInfo={updateSearchInfo}
            searchState={searchState}
          />

          {/* 리스트 */}
          <StTabBox>
            <Tabs
              defaultActiveKey="event"
              id="justify-tab-example"
              activeKey={searchState.main}
              onSelect={(key) =>
                dispatch(putSearchState({ ...searchState, main: key, page: 0 }))
              }
              className="tabs"
              justify
            >
              <Tab eventKey="event" title="행사글" />
              <Tab eventKey="gather" title="모집글" />
              <Tab eventKey="ask" title="질문글" />
            </Tabs>
            {/* 리스트 */}
            <List
              posts={posts}
              main={searchState.main}
              isLoading={isLoading}
              setPage={setPage}
              istLastPage={istLastPage}
            />
            <Deletes />
          </StTabBox>
        </StHomeWrap>
      </Layout>
    );
};

export default Home;

const Deletes = styled.div`
width: 100%;
`

const StHomeWrap = styled.div`
    display : ${(props) => props.display}
;`

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

/* 배너 모달 버튼 -- 수정할 것 */
const BannerModal = styled.div`
  background-color: red;
  width: 50px;
  height : 50px;
  `;

export const StyledSwiper = styled(Swiper)`
    background: red;
    ${flexRow}
    justify-content: center;
    width: 370px;
    /* @media screen and (max-width: 425px)  {
        width: 95%;
        border-radius: 20px;
    } */
`;

const StyleGuide = styled.div`
  ${flexRow}
  justify-content: center;
  width: 370px;
  height: auto;
  .swipe {
    width: 100%;
  }
`;

const Dim = styled.div`
  ${flexRow}
  z-index: 99;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  button {
    z-index: 100;
    display: flex;
    position: fixed;
    right: 13.2%;
    top: 3.6%;
    width: 120px;
    height: 30px;
    justify-content: center;
    background-color: aliceblue;
    border: 1px solid lightgray;
    :hover {
      cursor: pointer;
      background-color: beige;
    }
    /* @media screen and (max-width: 425px) {
      width: 80px;
      right: 11%;
      top: 30%;
    } */
  }
`;

export const ItemDetailImg = styled.img`
  width: 100%;
  height: 90%;
`;

