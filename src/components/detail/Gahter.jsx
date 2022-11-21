import React from 'react';
import Comment from '../common/Comment';
import KakaoMap from '../common/KakaoMap';
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

// 스크랩
import { __postScrap } from '../../redux/modules/postSlice';
import PostScrap from '../post/PostScrap';

const Gahter = () => {
    return (
        <StWrap>
            <StTitleBox>Gahter</StTitleBox>

            {/* 스크랩  ----- 일단 임의 위치!! 기능 확인 후 수정하기 */}
            <LikeBox>
                <PostScrap />
            </LikeBox>

            <StImgBox>
                <img className='main-img' src={noImg} />
                <div className='sub-img-wrap'>
                    <img className='sub-img' src={noImg} />
                    <img className='sub-img' src={noImg} />
                </div>
            </StImgBox>

            <StContentBox>소개글</StContentBox>
            <StEventLinkBox>
                <div>행사장 링크</div>
                <input type="text" />
            </StEventLinkBox>
            <StEventPlaceBox>
                <div>행사장소</div>
                <div className='address-box'>
                    <div className='tag'>#서울</div>
                    <div className='address'>서울특별시 성북구 동소문로15길 99</div>
                </div>
            </StEventPlaceBox>
            <KakaoMap address='서울특별시 성북구 동소문로15길 99(동소문동7가, 한신휴아파트)' width='100%' height='130px' />
            <StButtonBox>
                <button>수정</button>
            </StButtonBox>
            <Comment />

        </StWrap>
    );
};

export default Gahter;


const LikeBox = styled.div`
    width:100%;
    height:50px;
`