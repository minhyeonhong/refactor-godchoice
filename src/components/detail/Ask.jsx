import React, { useEffect, useRef, useState } from 'react';
import Comment from '../common/Comment';
import KakaoMap from '../common/KakaoMap';
import Carousel from 'react-bootstrap/Carousel';
import {
    StWrap,
    StTitleBox,
    StImgBox,
    StContentBox,
    StEventLinkBox,
    StEventPlaceBox,
    StButtonBox
} from '../styles/Detail.styled'
import { ModalWrap, AllInput, AllTextarea } from '../styles/GatherDetail.styled'
import noImg from '../../assets/images/common/noImg.jpg'
import { useDispatch } from 'react-redux';
import SearchAddress from '../post/SearchAddress';
import useImgUpload from "../../hooks/useImgUpload";
import styled from 'styled-components';
import { __putPost, __deletePost } from '../../redux/modules/postSlice3';

// 스크랩
import { __postScrap } from '../../redux/modules/postSlice';
import PostScrap from './PostScrap';

const Ask = ({ post, postId, modPost, setmodPost, modPostHandle }) => {

    const dispatch = useDispatch();

    //수정하기
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => { setEdit(!edit); };


    //이미지 업로드 훅
    const [files, fileUrls, uploadHandle] = useImgUpload(5, true, 0.5, 1000);
    //기존 프리뷰 지울 state
    const [delImg, setDelImg] = useState([]);

    //이미지 업로드 인풋돔 선택 훅
    const imgRef = useRef();

    //submit
    const onSubmitAsk = () => {

        const formData = new FormData();

        if (files.length > 0) {
            files.forEach((file) => {
                formData.append("multipartFile", file);
            })
        } else {
            formData.append("multipartFile", null);
        }

        const detail = modPost.detailAddress === undefined ? "" : modPost.detailAddress


        const obj = {
            imgId: delImg.join(),
            title: modPost.title,
            content: modPost.content,
            postLink: modPost.postLink,
            postAddress: modPost.postAddress + detail
        }

        console.log("obj", obj);
        //폼 데이터에 글작성 데이터 넣기
        formData.append("askPostPutRequestDto", new Blob([JSON.stringify(obj)], { type: "application/json" }));

        //Api 날리기
        dispatch(__putPost({ postId, content: formData }));
    }

    //슬라이드 자동으로 넘기는 부분
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    //기존글의 삭제할 이미지
    const delImgHandle = (imageId) => {
        setDelImg((e) => [...e, imageId]);
    }

    // 주소 API 팝업창 상태 관리& useState
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const popupPostCode = () => { setIsPopupOpen(!isPopupOpen) }
    const [postAddress, setPostAddress] = useState(post.postAddress)

    useEffect(() => {
        if (postAddress !== "") {
            setmodPost({ ...modPost, postAddress })
        }
    }, [postAddress])

    const onAskDelete = (postId) => {
        dispatch(__deletePost(postId))
    }

    return (
        Object.keys(post).length < 1 ?
            <div>페이지 정보 없음</div>
            :
            <>
                {edit ? (

                    <div>
                        <StTitleBox>
                            <AllInput type="text" placeholder="제목" name="title" defaultValue={modPost.title || ""} onChange={modPostHandle} style={{ width: "100%" }} />
                        </StTitleBox>
                        <div><br />

                            {/*이미지 올리기*/}
                            <StCarouselWrap>
                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                    {modPost.askPostImgList.map((img, i) => {
                                        return (
                                            <Carousel.Item key={img.id}>
                                                <img style={{ height: "180px" }}
                                                    className="d-block w-100"
                                                    src={img.image}
                                                    alt={`slide${i + 1}`}
                                                />
                                            </Carousel.Item>
                                        )
                                    })}
                                </Carousel>

                                {modPost.askPostImgList.map((img, i) => {
                                    return (
                                        img.imageId &&
                                        // <button style={{ width: '60px', height: '60px', backgroundImage: `url(${imgInfo.postImgUrl})` }} ></button>
                                        <button style={{ display: delImg.indexOf(img.imageId) > -1 ? "none" : "inline-block" }}
                                            onClick={() => delImgHandle(img.imageId)} key={img.id}>
                                            <img style={{ width: '60px', height: '60px' }} src={img.image} />
                                        </button>
                                    )
                                })}

                                <STUploadButton onClick={() => { imgRef.current.click() }}>+</STUploadButton>

                                <label htmlFor="imgFile">
                                    <input
                                        style={{ display: "none" }}
                                        type="file"
                                        id="imgFile"
                                        onChange={uploadHandle}
                                        accept="image/*"
                                        ref={imgRef}
                                        name="imgFile"
                                        multiple />
                                </label>

                                <div>
                                    {
                                        fileUrls.map((imgUrl, i) => {
                                            return (
                                                <img style={{ width: '60px', height: '60px' }} src={imgUrl} key={i} />
                                            )
                                        })
                                    }
                                </div>
                            </StCarouselWrap>

                        </div>
                        <StContentBox>
                            <AllTextarea type="text" name="content" defaultValue={modPost.content || ""} onChange={modPostHandle} />
                        </StContentBox>

                        <StEventLinkBox>
                            <br /><label>행사장 링크</label><br />
                            <AllInput type="text" name="postLink" defaultValue={modPost.postLink} onChange={modPostHandle} style={{ width: "100%" }} />
                        </StEventLinkBox><br />

                        <div>
                            <StEventPlaceBox>
                                <div>행사장소<button onClick={popupPostCode}> 주소 검색하기</button></div>
                                {isPopupOpen && (
                                    <ModalWrap>
                                        <SearchAddress setPostAddres={setPostAddress} popupPostCode={popupPostCode} />
                                    </ModalWrap>
                                )}
                                <div className='address-box'>
                                    <div className='tag'>#{modPost.postAddress && modPost.postAddress.split(' ')[0]}</div>
                                    <div className='address'>{modPost.postAddress}</div>
                                </div>
                            </StEventPlaceBox><br />
                            <input type="text" placeholder='상세주소' value={modPost.detailAddress} onChange={modPostHandle} />
                            <KakaoMap address={modPost.postAddress} width='100%' height='130px' />
                        </div><br />
                        <div>
                            <button onClick={onSubmitAsk}> 수정완료</button>
                            <button onClick={toggleEdit}>취소</button>
                        </div>
                    </div>
                )
                    :
                    (
                        <StWrap>
                            <StTitleBox>{post.title}</StTitleBox>
                            <div>
                                <Carousel fade>
                                    {
                                        post.askPostImgList
                                        && post.askPostImgList.map((img, i) => {
                                            return (
                                                <Carousel.Item key={img.id + i}>
                                                    <img style={{ width: '400px' }}
                                                        src={img.image} />
                                                </Carousel.Item>)
                                        })
                                    }
                                </Carousel>
                            </div>
                            <StContentBox>{post.content}</StContentBox>
                            <StEventLinkBox>
                                <div>행사장 링크</div>
                                <input type="text" value={post.postLink || ""} />
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
                                {localStorage.getItem('userId') === post.userId.toString() &&
                                    (<div>
                                        <button onClick={toggleEdit}>수정</button>
                                        <button onClick={() => { onAskDelete(postId); }}>삭제</button>
                                    </div>)}
                            </StButtonBox>
                            {/* <Comment /> */}

                        </StWrap>
                    )}
                {/* 스크랩  ----- 일단 임의 위치!! 기능 확인 후 수정하기 */}
                <LikeBox>
                    <PostScrap />
                </LikeBox>

                {/* 스크랩  ----- 일단 임의 위치!! 기능 확인 후 수정하기 */}
                <LikeBox>
                    <PostScrap />
                </LikeBox>
            </>
    );
};

export default Ask;


const StCarouselWrap = styled.div`
    .carousel-indicators [data-bs-target]{
        width:3px;
        border-radius : 50%;
    }
`
const STUploadButton = styled.button`
    margin-left:10px;
    width : 60px;
    height : 60px;
    background-color: #F4F4F4;
    color : #5E5E5E;
    float : left;
    font-size: 40px;
    vertical-align : middle;
    height : 100%;
    border-radius: 10px;
    border : transparent;
`

const LikeBox = styled.div`
    width:100%;
    height:50px;
`