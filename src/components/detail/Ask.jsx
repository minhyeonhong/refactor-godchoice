import React from 'react';
import Comment from '../common/Comment';
import KakaoMap from '../common/KakaoMap';

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

const Ask = ({post}) => {

    // const region = (post.postAddress.split(" ")[0]);

    return (
        Object.keys(post).length < 1 ?
        <div>페이지 정보 없음</div>
        :
        <StWrap>
            <StTitleBox>{post.title}</StTitleBox>

            <StImgBox>
                <img className='main-img' src={noImg} />
                <div className='sub-img-wrap'>
                    <img className='sub-img' src={noImg} />
                    <img className='sub-img' src={noImg} />
                </div>
            </StImgBox>

            <StContentBox>{post.content}</StContentBox>
            <StEventLinkBox>
                <div>행사장 링크</div>
                <input type="text" value={post.postLink || ""}/>
            </StEventLinkBox>
            <StEventPlaceBox>
                <div>행사장소</div>
                <div className='address-box'>
                <div className='tag'>#{post.postAddress.split(" ")[0]}</div>
                    <div className='address'>{post.postAddress}</div>
                </div>
            </StEventPlaceBox>
            <KakaoMap address={post.postAddress} width='100%' height='130px' />
            <StButtonBox>
                <button>수정</button>
            </StButtonBox>
            {/* <Comment /> */}

        </StWrap>
    );
};

export default Ask;
