import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../common/Comment';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

//kakao 주소 관련
import SearchAddress from '../post/SearchAddress';
import KakaoMap from '../common/KakaoMap';
//부트스트랩
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';


// 스크랩
import { __postScrap } from '../../redux/modules/postSlice';
import PostScrap from './PostScrap';



import {
    StWrap,
    StTitleBox,
    StImgBox,
    StContentBox,
    StEventLinkBox,
    StEventPlaceBox,
    StButtonBox,
    AllTextarea,
    ModalWrap
} from '../styles/Detail.styled'

import { useEffect } from 'react';

import useImgUpload from "../../hooks/useImgUpload";
import { __deletePost, __putPost } from '../../redux/modules/postSlice';
import { useDispatch } from 'react-redux';
import Views from '../../assets/icon/Views.svg'

const Event = ({ post, postId, modPost, setmodPost, modPostHandle }) => {
    const dispatch = useDispatch();
    //슬라이드 자동으로 넘기는 부분
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    //상세글 수정하기 상태
    const [mod, setMod] = useState(false);

    // 주소 API 팝업창 상태 관리
    const [isAddressModal, setIsAddressModal] = useState(false);
    //주소 API useState
    const [postAddress, setPostAddress] = useState("");

    const popupPostCode = () => {
        setIsAddressModal(!isAddressModal)
    }

    useEffect(() => {
        if (postAddress !== "") {
            setmodPost({ ...modPost, postAddress })
        }
    }, [postAddress])

    //이미지 업로드 훅
    const [files, fileUrls, uploadHandle] = useImgUpload(5, true, 0.5, 1000);
    //기존 프리뷰 지울 state
    const [delImg, setDelImg] = useState([]);

    //이미지 업로드 인풋돔 선택 훅
    const imgRef = useRef();

    //submit
    const putPostSubmit = () => {
        //request로 날릴 폼데이터
        const formData = new FormData();

        //폼 데이터에 파일 담기
        if (files.length > 0) {
            files.forEach((file) => {
                formData.append("multipartFile", file);
            })
        } else {
            formData.append("multipartFile", null);
        }

        const detail = modPost.detailAddress === undefined ? "" : modPost.detailAddress
        //        console.log(delImg.join())


        const obj = {
            imgId: delImg.join(),
            category: modPost.category,
            startPeriod: modPost.startPeriod,
            endPeriod: modPost.endPeriod,
            title: modPost.title,
            content: modPost.content,
            postLink: modPost.postLink,
            //postState: modPost.postState,
            postAddress: modPost.postAddress + detail
        }

        //console.log("obj", obj);
        //폼 데이터에 글작성 데이터 넣기
        formData.append("eventPostPutReqDto", new Blob([JSON.stringify(obj)], { type: "application/json" }));


        //Api 날리기
        dispatch(__putPost({ postId, content: formData }));
    }

    const categoryOption = ['마라톤', '페스티벌', '전시회', '공연', '기타'];
    //날짜 제한
    const today = new Date();
    const today2 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


    //기존글의 삭제할 이미지
    const delImgHandle = (postImgId) => {
        setDelImg((e) => [...e, postImgId]);
    }

    //게시글 삭제
    const onEventDelete = (postId) => {
        dispatch(__deletePost(postId))
    }
    return (
        Object.keys(post).length < 1 ?
            <div>페이지 정보 없음</div>
            :
            <StWrap>
                {!mod ?
                    <>

                        <STIng style={{ marginTop: "14px", marginBottom: "14px" }}>
                            {post.postState === "진행중" ?
                                (<STIngDiv>{post.postState}</STIngDiv>)
                                :
                                (<STIngDiv style={{ background: "#727785" }}>{post.postState}</STIngDiv>)
                            }
                            <STImg style={{ display: "flex", marginLeft: "16px" }}>
                                <img src={Views} style={{ width: "20px", height: "20px", flex: "2" }} />
                                <div style={{ color: "#8B909F", flex: "8", marginLeft: "5px" }}>{post.viewCount}</div>
                            </STImg>
                            <PostScrap style={{ position: "absolute", right: "10px" }} bookMarkStatus={post.bookMarkStatus} />
                        </STIng>

                        <STBox2 style={{ display: "flex" }}>
                            <STButton style={{ width: "65px", flex: "2" }}>행사글</STButton>
                            <STButton style={{ width: "70px", flex: "2" }}>{post.category}</STButton>
                            <STButton style={{ width: "110px", flex: "3" }}>{post.startPeriod}</STButton>
                            <span style={{ paddingTop: "8px" }}>~</span>
                            <STButton style={{ width: "110px", flex: "3" }}>{post.endPeriod}</STButton>
                        </STBox2>

                        <div style={{ marginBottom: "14px" }}>
                            <img src={post.userImg} style={{ width: "36px", height: "36px", borderRadius: "30px" }} />
                            <STUsername>{post.username}</STUsername>
                        </div>

                        <STInput style={{ marginBottom: "8px" }}><p>{post.title}</p></STInput>

                        <StCarouselWrap>
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                                {
                                    post.postImgInfo !== undefined &&
                                    post.postImgInfo.map((imgInfo, i) => {
                                        return (
                                            <Carousel.Item key={i}>
                                                <img style={{ width: "100%", height: "396px", borderRadius: "10px", objectFit: "contain" }}
                                                    className="d-block w-100"
                                                    src={imgInfo.postImgUrl}
                                                    alt={`slide${i + 1}`}
                                                />
                                            </Carousel.Item>
                                        )
                                    })}
                            </Carousel>
                        </StCarouselWrap>
                        <StContent type='text' style={{ marginBottom: "14px", paddingTop: "5px" }} value={post.content || ""} readOnly />


                        <div>행사장 링크</div>
                        <STInput style={{ marginBottom: "14px" }}>{post.postLink}</STInput>


                        <div>행사장소</div>
                        <div style={{ display: "flex", marginBottom: "8px" }}>
                            <STAddressButton style={{ flex: "2" }}>#{post.postAddress.split(' ')[0]}</STAddressButton>
                            <STInput style={{ flex: "8", marginLeft: "5px" }}>{post.postAddress}</STInput>
                        </div>

                        <KakaoMap address={post.postAddress} width='100%' height='144px' />

                        {localStorage.getItem('userId') === post.userId.toString() &&
                            (<div>
                                <STEditButton style={{ background: "#515466" }} onClick={() => { onEventDelete(postId); }}>삭제</STEditButton>
                                <STEditButton onClick={() => { setMod(true) }}>수정</STEditButton>
                            </div>)}
                    </>
                    :

                    <>
                        <StTypeBox>
                            <div>행사글</div>
                            <STSelect defaultValue={modPost.category} name="category" onChange={modPostHandle}>
                                {categoryOption.map((cate, i) => {
                                    return (
                                        <option value={cate} key={i}>{cate}</option>
                                    )
                                })}
                            </STSelect>

                            <div>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>행사시작</Form.Label>
                                        <Form.Control type="date" name="startPeriod" value={modPost.startPeriod || ""} onChange={modPostHandle} min={today2} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>행사마감</Form.Label>
                                        <Form.Control type="date" name="endPeriod" value={modPost.endPeriod || ""} onChange={modPostHandle} min={today2} />
                                    </Form.Group>
                                </Row>
                            </div>
                        </StTypeBox>
                        <StTitleBox>
                            <input type='text' name='title' value={modPost.title || ""} onChange={modPostHandle} />
                        </StTitleBox>

                        <StCarouselWrap>
                            {//modPost.postImgInfo.length > 1 &&
                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                    {modPost.postImgInfo.map((imgInfo, i) => {
                                        return (
                                            <Carousel.Item key={i}>
                                                <img style={{ height: "180px" }}
                                                    className="d-block w-100"
                                                    src={imgInfo.postImgUrl}
                                                    alt={`slide${i + 1}`}
                                                />
                                            </Carousel.Item>
                                        )
                                    })}
                                </Carousel>
                            }
                            {modPost.postImgInfo.map((imgInfo, i) => {
                                return (
                                    imgInfo.postImgId &&
                                    // <button style={{ width: '60px', height: '60px', backgroundImage: `url(${imgInfo.postImgUrl})` }} ></button>
                                    <button style={{ display: delImg.indexOf(imgInfo.postImgId) > -1 ? "none" : "inline-block" }}
                                        onClick={() => delImgHandle(imgInfo.postImgId)} key={i}>
                                        <img style={{ width: '60px', height: '60px' }} src={imgInfo.postImgUrl} />
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

                        <StContentBox>
                            <AllTextarea type="text" name='content' value={modPost.content || ""} onChange={modPostHandle} placeholder="행사글을 띄어쓰기 포함 2500자 이내로 입력해주세요" maxLength={2500} />
                        </StContentBox>

                        <StEventLinkBox>
                            <div>행사장 링크</div>
                            <input type='text' name='postLink' value={modPost.postLink || ""} onChange={modPostHandle} />
                        </StEventLinkBox>
                        <StEventPlaceBox>
                            <div>행사장소</div>
                            <button onClick={popupPostCode}>
                                <FiSearch style={{ width: '20px', height: '20px', color: '#FFAE00' }} />
                            </button>
                            {isAddressModal && (
                                <ModalWrap>
                                    <SearchAddress setPostAddres={setPostAddress} popupPostCode={popupPostCode} />
                                </ModalWrap>
                            )}
                            <div className='address-box'>
                                <div className='tag'>#{modPost.postAddress.split(' ')[0]}</div>
                                <div className='address'>{modPost.postAddress}</div>
                            </div>
                        </StEventPlaceBox>
                        <KakaoMap address={modPost.postAddress} width='100%' height='130px' />
                        <input type="text" placeholder='상세주소' name="detailAddress" onChange={modPostHandle} />
                        <StButtonBox>

                            <div>
                                <button onClick={() => setMod(false)}>취소</button>
                                <button onClick={putPostSubmit}>수정하기</button>
                            </div>
                        </StButtonBox>
                    </>
                }
                <Comment postId={postId} kind='event' commentDtoList={post.commentDtoList} />
            </StWrap >
    );
};

export default Event;

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

const StTypeBox = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`
const STSelect = styled.select`
    font-size: 14px;
    background-color: #F4F4F4;
    width : 48%;
    border-radius: 10px;
    border : transparent;
    padding:5px;
    height : 32px;
    
`

//---------------------

const STIng = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 206px;
    width: 100%;
    height: 44px;
`

const STIngDiv = styled.p`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    vertical-align: center;
    /* padding: 14px 16px 14px 18px; */
    /* gap: 10px; */
    justify-content: center;
    width: 85px;
    height: 44px;
    background: #15DD95;
    color: #FFFFFF;
    /* line-height: 44px; */
`
const STUsername = styled.span`
    color : #424754;
    margin-left: 12px;
`
const STInput = styled.div`
    width: 100%;
    //height: 36px;
    background: white;
    border-radius: 10px;
    font-weight: 500;
    padding-top: 6px;
    padding-left: 6px;
    padding-bottom: 6px;
`

const LikeBox = styled.div`
    width:100%;
    height:50px;
`
const STButton = styled.p`
    background: #DDE1FF;
    border-radius: 100px;
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color :#00105C;
`

const STBox2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    width: 100%;
    height: 44px;
    font-size: 17px;
`

const StContent = styled.textarea`
    width: 100%;
    height: 144px;
    border : transparent;
    background: #FFFFFF;
    padding-top: 6px;
    padding-left: 6px;
`

const STAddressButton = styled.div`
    width: 64px;
    height: 36px;
    background-color: #DCE0F1;
    border-radius: 30px;
    text-align: center;
    padding-top: 6px;
`

const STEditButton = styled.button`
    width: 67px;
    height: 40px;
    background: #B8C4FF;
    border-radius: 100px;
    float: right;
    
    border : transparent;
`

const STImg = styled.div`
    display : inline-block;
    //background-color: black;
    position: absolute;
    left : 94px;
    margin-left: 10px;
`