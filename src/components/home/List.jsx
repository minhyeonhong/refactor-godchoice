import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { __postList } from '../../redux/modules/postSlice'

import { useInView } from "react-intersection-observer"
import styled from 'styled-components';

import Loading from '../../components/common/Loading'

import { BsEye } from 'react-icons/bs';

const List = ({ totalPages, posts, isLoading, page, setPage }) => {

    const [ref, inView] = useInView();

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니고 마지막이 아니면 페이지+1
        if (inView && !isLoading && page < totalPages) {
            setPage(prevState => prevState + 1)
        }
    }, [inView, isLoading, page])

    return (
        <StCardWrap>
            {posts.length < 1 ?
                <div>콘텐츠 없음</div>
                :
                posts.map((val) => {
                    return (
                        <StCardItem key={val.id.toString()}>
                            <StImgBox>
                                <img />
                            </StImgBox>
                            <StContentBox>
                                <div className='inlineBox'>
                                    <div className='titleBox'>제목:{val.title}</div>
                                    <div>카테고리:{val.category}</div>
                                    <div>내용:{val.content}</div>
                                    <div className='dtateBox'>
                                        <div>{val.endPeriod}</div>
                                        <div className='lookBox'>12&nbsp;<BsEye style={{ width: '16px', height: '16px' }} /></div>
                                    </div>
                                </div>
                            </StContentBox>
                        </StCardItem>
                    )
                })}
            {
                inView && isLoading && <Loading />
            }
            {
                posts.length > 0 && <div ref={ref} />
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
    height : 136px;
    display : flex;
    flex-direction: row;
`

const StImgBox = styled.div`
    img {
        width:136px;
        height:136px;       
        border-radius : 20px;         
        background-color : pink;
    }
`

const StContentBox = styled.div`
    width : 100%;
    height : 136px;
    border-radius : 20px;    
    background-color : #E7E7E7;
    display : flex;
    justify-content : center;
    align-items : center;
    .inlineBox {
        width: 90%;
        height: 90%;
        display : flex;
        flex-direction : column;
        justify-content : space-evenly;
    }
    .titleBox{
        font-weight : bold;
    }
    .dtateBox{
        display : flex;
        justify-content : space-between;
        border-top : 1px solid #AEAEAE;
        font-size : 14px;
    }
    .lookBox {
        display : flex;
        align-items : center;
    }
`