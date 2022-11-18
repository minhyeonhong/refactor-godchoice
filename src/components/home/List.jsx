import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { __postList } from '../../redux/modules/postSlice'

import { useInView } from "react-intersection-observer"
import styled from 'styled-components';

import { BsEye } from 'react-icons/bs';

const List = () => {
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.postSlice);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [ref, inView] = useInView();


    /**  서버에서 아이템을 가지고 오는 함수 */
    const getItems = useCallback(async () => {
        dispatch(__postList(page));
    }, [dispatch, page])

    // `getItems` 가 바뀔 때 마다 함수 실행
    useEffect(() => {
        getItems()
        setTotal(posts.length)
        console.log("total", total)
    }, [getItems])

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니고 마지막이 아니면 페이지+1
        if (inView && !isLoading && total !== posts.length) {
            setPage(prevState => prevState + 1)
        }

    }, [inView, isLoading, total])


    useEffect(() => {
        console.log("posts", posts)
    }, [posts])

    return (
        <StCardWrap>
            {posts.map((val) => {
                return (
                    <StCardItem key={val.id.toString()}>
                        <StImgBox>
                            <img />
                        </StImgBox>
                        <StContentBox>
                            <div className='inlineBox'>
                                <div className='titleBox'>제목:{val.title}</div>
                                <div>카테고리</div>
                                <div>내용:{val.content}</div>
                                <div className='dtateBox'>
                                    <div>2022.00.00</div>
                                    <div className='lookBox'>12&nbsp;<BsEye style={{ width: '16px', height: '16px' }} /></div>
                                </div>
                            </div>
                        </StContentBox>
                    </StCardItem>
                )
            })}
            <div ref={ref} ></div>
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