import React, { useState } from 'react';
import Comment from '../common/Comment';
import KakaoMap from '../common/KakaoMap';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

import {
    StWrap,
    StTitleBox,
    StImgBox,
    StContentBox,
    StEventLinkBox,
    StEventPlaceBox,
    StButtonBox
} from '../styles/Detail.styled'

import noImg from '../../assets/images/common/noImg.jpg'
import { useEffect } from 'react';

const Event = ({ post }) => {
    //슬라이드 자동으로 넘기는 부분
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const [radioProp, setRadioProp] = useState({
        label: "진행중",
        checked: true
    });
    const radioHandle = (e) => {
        if (e.target.checked) {
            setRadioProp({
                label: "진행중",
                checked: true
            });
        } else {
            setRadioProp({
                label: "마감",
                checked: false
            });
        }
    }

    useEffect(() => {
        console.log("post", Object.keys(post).length > 0);
    }, [post])
    return (
        Object.keys(post).length < 1 ?
            <div>페이지 정보 없음</div>
            :
            <StWrap>
                <StTitleBox>{post.title}</StTitleBox>

                <StCarouselWrap>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {post.postImgUrl.map((imgUrl, i) => {
                            return (
                                <Carousel.Item key={i}>
                                    <img style={{ height: "180px" }}
                                        className="d-block w-100"
                                        src={imgUrl}
                                        alt={`slide${i + 1}`}
                                    />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </StCarouselWrap>

                <StContentBox>{post.content}</StContentBox>
                <StEventLinkBox>
                    <div>행사장 링크</div>
                    <input type='text' value={post.postLink || ""} />
                </StEventLinkBox>
                <StEventPlaceBox>
                    <div>행사장소</div>
                    <div className='address-box'>
                        <div className='tag'>#{post.postAddress.split(' ')[0]}</div>
                        <div className='address'>{post.postAddress}</div>
                    </div>
                </StEventPlaceBox>
                <KakaoMap address={post.postAddress} width='100%' height='130px' />
                <StButtonBox>
                    {/* <div>
                        <label>{radioProp.label}</label>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            checked={radioProp.checked}
                            onChange={radioHandle}
                        // label={radioProp.label}
                        />
                    </div> */}
                    <div style={{ border: '1px solid black' }}>{post.postState}</div>

                    {localStorage.getItem('userId') === post.userId && <button>수정</button>}

                </StButtonBox>
                <Comment />
            </StWrap>
    );
};

export default Event;

const StCarouselWrap = styled.div`
    .carousel-indicators [data-bs-target]{
        width:3px;
        border-radius : 50%;
    }
`
