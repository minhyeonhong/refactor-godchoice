import React, { useState, useRef } from 'react';
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

    // const ingHandle = (e) => {
    //     if (e.target.checked) {
    //         setmodPost({ ...modPost, postState: "진행중" });
    //     } else {
    //         setmodPost({ ...modPost, postState: "종료" });
    //     }
    // }

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

        const detail  = modPost.detailAddress ===undefined? "":modPost.detailAddress 
        console.log(delImg.join())
   

        const obj = {
            imgId: delImg.join(),
            category: modPost.category,
            startPeriod: modPost.startPeriod,
            endPeriod: modPost.endPeriod,
            title: modPost.title,
            content: modPost.content,
            postLink: modPost.postLink,
            //postState: modPost.postState,
            postAddress: modPost.postAddress+detail
        }

        console.log("obj", obj);
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
                        <br/>
                        <STIng>
                            <STIngDiv>{post.postState}</STIngDiv>
                        </STIng>
                        <div>
                            <span>행사글</span>
                       
                            <span>{post.category}</span>
                            <span>
                                <span>{post.startPeriod}</span>{" ~ "}
                                <span>{post.endPeriod}</span>
                            </span>
                        </div>
                        <div>
                            <img src={post.userImg} style={{width: "36px", height: "36px", borderRadius:"30px"}} />
                            <STUsername>{post.username}</STUsername>
                        </div>
                    
                        <STTitle><p>{post.title}</p></STTitle>

                        <StCarouselWrap>
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                                {post.postImgInfo.map((imgInfo, i) => {
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
                        </StCarouselWrap>

                        <StContentBox>{post.content}</StContentBox>
                        <StEventLinkBox>
                            <div>행사장 링크</div>
                            <div style={{ border: '1px solid black' }}>{post.postLink}</div>
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
                            <div style={{ border: '1px solid black' }}>{post.postState}</div>
                            
                            {localStorage.getItem('userId') === post.userId.toString() && 
                            (<div>
                                <button onClick={()=> {onEventDelete(postId); }}>삭제</button>
                                <button onClick={() => { setMod(true) }}>수정</button>
                            </div>)}
                        </StButtonBox>
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
                        <input type="text" placeholder='상세주소' name="detailAddress" onChange={modPostHandle}/>
                        <StButtonBox>
                            {/* <div>
                                <label>{modPost.postState}</label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    checked={modPost.postState === '진행중' ? true : false}
                                    onChange={ingHandle}
                                />
                            </div> */}

                            <div>
                                <button onClick={() => setMod(false)}>취소</button>
                                <button onClick={putPostSubmit}>수정하기</button>
                            </div>
                        </StButtonBox>
                    </>
                }
                {/* <Comment /> */}
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
    width: 396px;
    height: 44px;
`

const STIngDiv = styled.p`
    display: flex;
    flex-direction: row;
    align-items: center;
    vertical-align: center;
    padding: 14px 16px 14px 18px;
    /* gap: 10px; */
    width: 85px;
    height: 44px;
    background: #15DD95;
    color: #FFFFFF;
    /* line-height: 44px; */
`
const STUsername= styled.span`
    color : #424754;
    margin-left: 12px;
`
const STTitle = styled.div`
    width: 396px;
    height: 36px;
    background: #F4F5F7;
    border-radius: 10px;
    font-weight: 500;
    .p{
        width: 372px;
        height: 20px;

        font-family: 'Pretendard Variable';
        font-style: normal;
        font-weight: 500;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: -0.017em;
        color: #161B27;
    }
`