import React, { useState } from 'react';
import Comment from '../common/Comment';
import KakaoMap from '../common/KakaoMap';
import Form from 'react-bootstrap/Form';

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

const Event = () => {
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
    return (
        <StWrap>
            <StTitleBox>event</StTitleBox>

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
                <div>
                    <label>{radioProp.label}</label>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={radioProp.checked}
                        onChange={radioHandle}
                    // label={radioProp.label}
                    />
                </div>
                <button>수정</button>
            </StButtonBox>
            <Comment />
        </StWrap>
    );
};

export default Event;

export default Event;