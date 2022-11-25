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
import { ModalWrap, AllInput } from '../styles/GatherDetail.styled'
import noImg from '../../assets/images/common/noImg.jpg'
import { useDispatch } from 'react-redux';
import SearchAddress from '../post/SearchAddress';
import useImgUpload from "../../hooks/useImgUpload";
import styled from 'styled-components';
import { __putPost, __deletePost } from '../../redux/modules/postSlice3';
import Views from '../../assets/icon/Views.svg'
import { FiSearch } from 'react-icons/fi';
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

        const detail = detailAddress === undefined ? "" : detailAddress


        const obj = {
            imgId: delImg.join(),
            title: modPost.title,
            content: modPost.content,
            postLink: modPost.postLink,
            postAddress: modPost.postAddress + detail
        }
        console.log(detailAddress)
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

    const [detailAddress, setDetailAddress] = useState()


    return (
        Object.keys(post).length < 1 ?
            <div>페이지 정보 없음</div>
            :
            <StWrap>
                {edit ? (

                    <div style={{ marginTop: "14px" }}>
                        <h4 style={{ textAlign: "center", marginTop: "18px", marginBottom: "18px" }}>질문글</h4>
                        <STInput3 type="text" placeholder="제목" name="title" defaultValue={modPost.title || ""} onChange={modPostHandle} style={{ width: "100%" }} />

                        <div><br />

                            {/*이미지 올리기*/}
                            <StCarouselWrap>
                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                    {modPost.askPostImgList.map((img, i) => {
                                        return (
                                            <Carousel.Item key={img.id}>
                                                <img style={{ width: "100%", height: "396px", borderRadius: "10px", objectFit: "contain" }}
                                                    className="d-block w-100"
                                                    src={img.postImgUrl}
                                                    alt={`slide${i + 1}`}
                                                />
                                            </Carousel.Item>
                                        )
                                    })}
                                </Carousel>

                                {modPost.askPostImgList.map((img, i) => {
                                    return (
                                        img.postImgId &&
                                        // <button style={{ width: '60px', height: '60px', backgroundImage: `url(${imgInfo.postImgUrl})` }} ></button>
                                        <button style={{ display: delImg.indexOf(img.postImgId) > -1 ? "none" : "inline-block" }}
                                            onClick={() => delImgHandle(img.postImgId)} key={img.postImgId}>
                                            <img style={{ width: '60px', height: '60px' }} src={img.postImgUrl} />
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


                                {
                                    fileUrls && fileUrls.map((imgUrl, i) => {
                                        return (
                                            <img style={{ width: '60px', height: '60px' }} src={imgUrl} key={i} />
                                        )
                                    })
                                }

                            </StCarouselWrap>

                        </div>

                        <AllTextarea style={{ height: "200px", marginTop: "14px", marginBottom: "14px" }} type="text" name="content" defaultValue={modPost.content || ""} onChange={modPostHandle} />

                        <label>행사장 링크</label><br />
                        <STInput3 type="text" name="postLink" defaultValue={modPost.postLink} onChange={modPostHandle} style={{ width: "100%", marginBottom: "14px" }} />

                        <div>

                            <div>행사장소</div>
                            <StSearchBox style={{ background: "#E1E3EC" }} onClick={popupPostCode}>
                                <button style={{ color: "#8B909F" }}><FiSearch style={{ width: '20px', height: '20px', color: '#424754', marginLeft: "10px", marginRight: "10px" }} />주소검색</button>
                            </StSearchBox>
                            {/*<button onClick={popupPostCode}> 주소 검색하기</button>*/}
                            {isPopupOpen && (
                                <ModalWrap onClick={popupPostCode}>
                                    <SearchAddress setPostAddres={setPostAddress} popupPostCode={popupPostCode} />
                                </ModalWrap>
                            )}
                            <div style={{ display: "flex", marginTop: "14px" }}>
                                <STAddressDiv style={{ flex: "1" }}>#{modPost.postAddress && modPost.postAddress.split(' ')[0]}</STAddressDiv>
                                <STInput style={{ flex: "4", marginLeft: "10px" }}>{modPost.postAddress}</STInput>
                            </div>

                            {
                                modPost.postAddress !== post.postAddress && <STInput3 style={{ float: "right", width: "79%", height: "40px", marginTop: "10px" }} type="text" placeholder='상세주소' name={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
                            }


                            <KakaoMap address={modPost.postAddress} width='100%' height='130px' />
                        </div>
                        <div>
                            <STEditButton style={{ background: "#515466", marginLeft: "5px" }} onClick={onSubmitAsk}> 수정완료</STEditButton>
                            <STEditButton onClick={toggleEdit}>취소</STEditButton>
                        </div>
                    </div>
                )
                    :
                    (
                        <>
                            <STIng style={{ marginTop: "14px", marginBottom: "14px" }}>
                                <STImg style={{ display: "flex" }}>
                                    <img src={Views} style={{ width: "20px", height: "20px", flex: "2" }} />
                                    <div style={{ color: "#8B909F", flex: "8", marginLeft: "5px" }}>{post.viewCount}</div>
                                    <PostScrap style={{ position: "absolute", right: "10px" }} bookMarkStatus={post.bookMarkStatus} />

                                </STImg>
                            </STIng>
                            <div style={{ marginBottom: "14px" }}>
                                <img src={post.userImg} style={{ width: "36px", height: "36px", borderRadius: "30px" }} />
                                <STUsername>{post.userName}</STUsername>
                            </div>

                            <STInput style={{ marginBottom: "8px" }}>{post.title}</STInput>

                            <div>
                                <Carousel fade>
                                    {
                                        post.askPostImgList
                                        && post.askPostImgList.map((img, i) => {
                                            return (
                                                <Carousel.Item key={img.id + i}>
                                                    <img style={{ width: "100%", height: "396px", borderRadius: "10px", objectFit: "contain" }}
                                                        src={img.postImgUrl} />
                                                </Carousel.Item>)
                                        })
                                    }
                                </Carousel>
                            </div>

                            <StContent style={{ marginBottom: "14px", paddingTop: "5px" }}>{post.content}</StContent>

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
                                    <STEditButton style={{ background: "#515466", marginLeft: "5px" }} onClick={() => { onAskDelete(postId); }}>삭제</STEditButton>
                                    <STEditButton onClick={toggleEdit}>수정</STEditButton>
                                </div>)}
                        </>
                    )}
                <Comment postId={postId} kind='ask' commentDtoList={post.commentDtoList} />

            </StWrap >
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

const STButton2 = styled.p`
    background: white;
    border-radius: 100px;
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #424754; 
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

    //margin-left: 10px;
`

const STInput3 = styled.input`
    width: 100%;
    height: 36px;
    background: white;
    border-radius: 10px;
    font-weight: 500;
    padding-top: 6px;
    padding-left: 6px;
    padding-bottom: 6px;
    border:transparent;
    `

const AllTextarea = styled.textarea`
    border-radius: 10px;
    border: transparent;
    width :100%;
    background-color: white;
    padding-left: 10px;
    padding-top:10px;
`
const StSearchBox = styled.div`
    background: #EEEAE3;
    box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius : 30px;
    display : flex;
    flex-direction : row;
    margin : 0px 10px;
    height : 36px;
    button{
        background-color : transparent;
        border : none;
        border-radius :  30px 0 0 30px ; 
    }
`

const STAddressDiv = styled.div`
    width: 64px;
    height: 36px;
    background-color: #DCE0F1;
    border-radius: 30px;
    text-align: center;
    padding-top: 6px;
`