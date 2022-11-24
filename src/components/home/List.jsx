import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { __postList } from '../../redux/modules/postSlice'

import { useInView } from "react-intersection-observer"
import styled from 'styled-components';

import Loading from '../../components/common/Loading'

import { BsEye } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { BookmarkFill } from "../../assets/index";

const List = ({ posts, main, isLoading, istLastPage, setPage }) => {

    const navigate = useNavigate();

    const [ref, inView] = useInView();

    //마지막 체크를 위해
    const [listLength, setListLength] = useState(0);

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니고 마지막이 아니면 페이지+1
        if (inView && !isLoading && !istLastPage) {
            console.log("페이지 증가");
            setPage(prevState => prevState + 1)
        }
    }, [inView, isLoading])

    useEffect(() => {
        console.log("list posts", posts);
    }, [posts])

    return (
        <StCardWrap>
            {Object.keys(posts).length < 1 ?
                <div>콘텐츠 없음</div>
                :
                posts.map((val, i) => {
                    return (
                        <StCardItem key={i} onClick={() => { navigate(`/${main}posts/${val.postId}`) }}>
                            <StImgBox imgUrl={val.imgUrl} >
                                {val.bookMarkStatus &&
                                    <BookmarkFill style={{ margin: '4px 0 0 4px' }} />
                                }
                            </StImgBox>
                            <StContentBox>
                                <div className='titleBox'>{val.title}</div>
                                <div>{val.category}</div>
                                <div className='contentBox'>{val.content}</div>
                                <div className='dtateBox'>
                                    <div>{val.endPeriod}{val.date}</div>
                                    <div className='lookBox'>{val.viewCount}&nbsp;<BsEye style={{ width: '16px', height: '16px' }} /></div>
                                </div>
                            </StContentBox>
                        </StCardItem>
                    )
                })}
            {
                isLoading && <Loading spinerWidth='10%' />
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
    display: flex;
    flex-direction: row;
    padding: 12px 16px;

    height: 154px;
    background: #FFFFFF;
`

const StImgBox = styled.div`
        width:130px;
        height:130px;
        background-size : 130px 130px;
        background-image : url(${(props) => props.imgUrl});
        border-radius : 20px;
        border: 0.5px solid #F4F5F7;
`

const StContentBox = styled.div`
    flex : 2;
    margin-left : 20px;
    height: 130px;
    div {
        width : 100%;
        height : 25%;
    }
    .titleBox{
        font-weight : bold;
        font-size : 20px;
    }
    .contentBox {
        word-break: break-all;
    }
    .dtateBox{
        display : flex;
        justify-content : space-between;
        border-top : 1px solid #AEAEAE;
        font-size : 14px;
    }
    .lookBox {
        display : flex;
        justify-content : end;
    }
`