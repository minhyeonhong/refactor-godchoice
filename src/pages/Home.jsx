import React, { useState } from 'react';

import Layout from '../components/layout/Layout';
import List from '../components/home/List'
import Search from '../components/home/Search'
import Loading from '../components/common/Loading'
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { getCookie } from '../cookie/cookie';

const Home = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    console.log('쿠키 ====> ', getCookie('token'))
    return (
        <Layout>
            <StHomeWrap>
                {/* 슬라이드 */}
                <StCarouselWrap>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                            <img style={{ height: "180px" }}
                                className="d-block w-100"
                                src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>오늘의 핫플레이스 추천</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img style={{ height: "180px" }}
                                className="d-block w-100"
                                src="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h3>오늘의 핫플레이스 추천</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img style={{ height: "180px" }}
                                className="d-block w-100"
                                src="https://cdn.crowdpic.net/list-thumb/thumb_l_572442AD59D1F0170C27B68AC7F4377A.jpg"
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>오늘의 핫플레이스 추천</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </StCarouselWrap>

                {/* 검색 */}
                <Search />

                {/* 리스트 */}
                <StTabBox>
                    <Tabs
                        defaultActiveKey="home"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="home" title="행사글">
                            <List />
                        </Tab>
                        <Tab eventKey="profile" title="모집글">
                            a
                        </Tab>
                        <Tab eventKey="longer-tab" title="질문글">
                            s
                        </Tab>
                    </Tabs>
                </StTabBox>
            </StHomeWrap>
        </Layout>
    );
};

export default Home;

const StHomeWrap = styled.div`
    background-color: #FEFCF8;
`

const StCarouselWrap = styled.div`
    .carousel-indicators [data-bs-target]{
        width:3px;
        border-radius : 50%;
    }
`
const StTabBox = styled.div`
     margin : 0 10px;
     .nav-link {
        color : #ADABA9;
        font-weight : bold;
    }
    .nav-link.active {
        color : black;
        font-weight : bold;
    }
     /*
    li {
        border-bottom : 1px solid #dee2e6;
    }
    .nav-tabs {
        --bs-nav-tabs-border-width: none;
    }
    .nav-link {
        color : #ADABA9;
        font-weight : bold;
    }
    .nav-link.active {
        color : black;
        font-weight : bold;
        border-bottom : 3px solid black;
        border-width : 30%;
    } */
`