import React, { useState, useRef, useEffect } from 'react';
import Comment from '../common/Comment';
import KakaoMap from '../common/KakaoMap';
import Carousel from 'react-bootstrap/Carousel';
import { FiSearch } from 'react-icons/fi'
import imageCompression from 'browser-image-compression';
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
import { ModalWrap } from '../styles/GatherDetail.styled'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import SearchAddress from '../post/SearchAddress';
import useImgUpload from "../../hooks/useImgUpload";
import { __deletePost, __putPost } from '../../redux/modules/PostSlice2'
import { useNavigate } from 'react-router-dom';
import PostScrap from './PostScrap';
import Views from '../../assets/icon/Views.svg'
//성별관련 svg import
import GenderFemale from '../../assets/icon/GenderFemale.svg'
import GenderIntersex from '../../assets/icon/GenderIntersex.svg'
import GenderMale from '../../assets/icon/GenderMale.svg'

const Gather = ({ post, postId, modPost, setmodPost, modPostHandle }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const onSubmitGather = () => {

        if (counter < 1) { return (alert('모집인원을 입력하세요')) }
        if (modPost.kakaoLink === "") { return (alert('연락할 카카오 링크를 입력하세요')) }
        if (modPost.sex === "") { return (alert('성비를 선택하세요')) }
        if (modPost.startAge === "" || modPost.endAge === "") { return (alert('연령대를 입력하세요')) }
        if (modPost.title === "") { return (alert('제목을 입력하세요')) }
        if (modPost.content === "") { return (alert('내용을 입력하세요')) }
        if (modPost.category === "") { return (alert('카테고리를 입력하세요')) }

        //링크 검사(행사장링크 필수 아님)
        const arr = modPost.postLink.indexOf("https://") !== -1
        if (modPost.postLink !== "") {
            if (arr === false) {
                return (alert('https://가 포함된 링크를 입력해주세요'))
            }
        }



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

        const obj = {
            category: modPost.category,
            content: modPost.content,
            date: modPost.date,
            endAge: modPost.endAge,
            imgId: delImg.join(),
            kakaoLink: modPost.kakaoLink,
            number: counter,
            postAddress: modPost.postAddress + detail,
            postLink: modPost.postLink,
            sex: modPost.sex,
            startAge: modPost.startAge,
            title: modPost.title,
            postState: modPost.postState,
        }

        //폼 데이터에 글작성 데이터 넣기
        formData.append("gatherPostDto", new Blob([JSON.stringify(obj)], { type: "application/json" }));

        //Api 날리기
        dispatch(__putPost({ postId, content: formData }));
    }

    //날짜 제한
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear()
    const today2 = year + '-' + month + '-' + day;

    //성별 관련
    const sex = post.sex === "W" ? ("여") : (post.sex === "M" ? ("남") : ("상관없음"))

    //모집인원 counter 세기
    const [counter, setCounter] = useState(post.number);

    const handleAdd = () => { setCounter(counter + 1); }

    const handleminus = () => {
        if (counter > 0) {
            setCounter(counter - 1)
        }
    }

    useEffect(() => {
        if (post.number !== NaN) {
            setCounter(post.number)
        }
    }, [post.number])

    // 주소 API 팝업창 상태 관리& useState
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const popupPostCode = () => { setIsPopupOpen(!isPopupOpen) }
    const [postAddress, setPostAddress] = useState(post.postAddress)

    //슬라이드 자동으로 넘기는 부분
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    //기존글의 삭제할 이미지
    const delImgHandle = (postImgId) => {
        setDelImg((e) => [...e, postImgId]);
    }

    useEffect(() => {
        if (postAddress !== "") {
            setmodPost({ ...modPost, postAddress })
        }
    }, [postAddress])

    //게시글 삭제하기
    const onGatherDelete = (postId) => {
        dispatch(__deletePost(postId))
    }

    const ingHandle = (e) => {
        if (e.target.checked) {
            setmodPost({ ...modPost, postState: "진행중" });
        } else {
            setmodPost({ ...modPost, postState: "마감" });
        }
    }


    //성별에 맞는 svg 
    const sexSvg = sex === "남" ? GenderMale : (sex === "여" ? GenderFemale : GenderIntersex)

    return (
        Object.keys(post).length < 1 ?
            <div>페이지 정보 없음</div>
            :
            <StWrap>

                {
                    edit ?
                        (
                            <div>

                                <h4 style={{ textAlign: "center", marginTop: "18px", marginBottom: "18px" }}>모집글</h4>
                                <STInput3 style={{ marginBottom: "14px" }} type="text" placeholder="제목" name="title" defaultValue={modPost.title || ""} onChange={modPostHandle} />


                                {/*이미지 올리기*/}
                                <StCarouselWrap>
                                    <Carousel activeIndex={index} onSelect={handleSelect}>
                                        {modPost.postImgInfo.map((imgInfo, i) => {
                                            return (
                                                <Carousel.Item key={imgInfo.id}>
                                                    <img style={{ width: "100%", height: "396px", borderRadius: "10px", objectFit: "contain" }}
                                                        className="d-block w-100"
                                                        src={imgInfo.postImgUrl}
                                                        alt={`slide${i + 1}`}
                                                    />
                                                </Carousel.Item>
                                            )
                                        })}
                                    </Carousel>

                                    {modPost.postImgInfo.map((imgInfo, i) => {
                                        return (
                                            imgInfo.postImgId &&
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

                                    {
                                        fileUrls && fileUrls.map((imgUrl, i) => {
                                            return (
                                                <img style={{ width: '60px', height: '60px' }} src={imgUrl} key={i} />
                                            )
                                        })
                                    }

                                </StCarouselWrap>

                                <AllTextarea style={{ width: "100%", height: "200px", marginTop: "14px", marginBottom: "14px" }} name="content" defaultValue={modPost.content || ""} onChange={modPostHandle} />

                                <SelectWrap>

                                    <div style={{ display: "flex", marginLeft: "10px", marginBottom: "5px" }}>
                                        <div style={{ flex: "1" }}>카테고리</div>
                                        <div style={{ flex: "0.9" }}>만날 날짜</div>
                                    </div>

                                    <SelTop >
                                        <STSelect style={{ width: "50%" }} defaultValue={modPost.category} name="category" onChange={modPostHandle}>
                                            <option value="마라톤">마라톤</option>
                                            <option value="페스티벌">페스티벌</option>
                                            <option value="전시회">전시회</option>
                                            <option value="공연">공연</option>
                                            <option value="기타">기타</option>
                                        </STSelect>
                                        <STInput2 style={{ width: "50%" }} type="date" name="date" defaultValue={modPost.date || ""} onChange={modPostHandle} min={today2} />
                                    </SelTop>

                                    <div style={{ display: "flex", marginLeft: "10px", marginBottom: "5px" }}>
                                        <div style={{ flex: "1" }}>성비관련</div>
                                        <div style={{ flex: "0.9" }}>인원 수</div>
                                    </div>

                                    <SelBottom style={{ marginBottom: "14px" }}>
                                        <STSelect style={{ width: "50%" }} name="sex" defaultValue={modPost.sex} onChange={modPostHandle}>
                                            <option value="NF">성비무관</option>
                                            <option value="M">남</option>
                                            <option value="W">여</option>
                                        </STSelect>
                                        <STDiv style={{ width: "50%", textAlign: "center", display: "flex" }}>
                                            <STCountButton style={{ flex: "0.7" }} onClick={handleAdd}>+</STCountButton>
                                            <div style={{ flex: "1" }}>{counter}</div>
                                            <STCountButton style={{ flex: "0.7", right: "0px" }} onClick={handleminus}>-</STCountButton>
                                        </STDiv>
                                    </SelBottom>
                                    <SelBottom>

                                    </SelBottom>
                                </SelectWrap>

                                <div style={{ marginBottom: "14px" }}>
                                    <label>카카오 링크</label><br />
                                    <STInput3 type="text" name="kakaoLink" defaultValue={modPost.kakaoLink} onChange={modPostHandle} style={{ width: "100%" }} />
                                </div>

                                <div style={{ marginBottom: "14px" }}>
                                    <label>행사장 링크</label><br />
                                    <STInput3 type="text" name="postLink" defaultValue={modPost.postLink} onChange={modPostHandle} style={{ width: "100%" }} />
                                </div>

                                <div>
                                    <div>행사장소</div>
                                    <StSearchBox style={{ background: "#E1E3EC" }} onClick={popupPostCode}>
                                        <button style={{ color: "#8B909F" }}><FiSearch style={{ width: '20px', height: '20px', color: '#424754', marginLeft: "10px", marginRight: "10px" }} />주소검색</button>
                                    </StSearchBox>

                                    {isPopupOpen && (
                                        <ModalWrap onClick={popupPostCode}>
                                            <SearchAddress setPostAddres={setPostAddress} popupPostCode={popupPostCode} />
                                        </ModalWrap>
                                    )}

                                    {
                                        modPost.postAddress && (
                                            <>
                                                <div style={{ display: "flex", marginTop: "14px" }}>
                                                    <STAddressDiv>#{modPost.postAddress.split(' ')[0].length < 2 ? modPost.postAddress.split(' ')[0] : modPost.postAddress.split(' ')[0].substr(0, 2)}</STAddressDiv>
                                                    <STInput style={{ marginLeft: "10px" }}>{modPost.postAddress}</STInput>
                                                </div>
                                            </>
                                        )}


                                    {
                                        modPost.postAddress !== post.postAddress && <STInput3 style={{ float: "right", width: "83%", height: "40px", marginTop: "10px" }} type="text" placeholder='상세주소' name="detailAddress" onChange={modPostHandle} />
                                    }

                                    <KakaoMap address={modPost.postAddress} width='100%' height='130px' />
                                </div><br />
                                <div>
                                    <StRadioBox>
                                        <label>{modPost.postState}</label>
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            checked={modPost.postState === '진행중' ? true : false}
                                            onChange={ingHandle}
                                        />
                                    </StRadioBox>
                                </div>

                                <div>
                                    <STEditButton onClick={onSubmitGather}>수정완료</STEditButton>
                                    <STEditButton style={{ background: "#515466", marginRight: "5px" }} onClick={toggleEdit}>취소</STEditButton>
                                </div>
                            </div>

                        )
                        :
                        (
                            <>
                                <STIng style={{ marginTop: "14px", marginBottom: "14px" }}>
                                    {post.postState === "진행중" ?
                                        (<STIngDiv>{post.postState}</STIngDiv>) :
                                        (<STIngDiv style={{ background: "#727785" }}>{post.postState}</STIngDiv>)
                                    }

                                    <STImg style={{ display: "flex", marginLeft: "16px" }}>
                                        <img src={Views} style={{ width: "20px", height: "20px", flex: "2" }} />
                                        <div style={{ color: "#8B909F", flex: "8", marginLeft: "5px" }}>{post.viewCount}</div>
                                    </STImg>

                                    <PostScrap style={{ position: "absolute", right: "10px" }} bookMarkStatus={post.bookMarkStatus} />
                                </STIng>

                                <STBox2 style={{ marginBottom: "14px", display: "flex" }}>
                                    <STButton style={{ width: "70px", flex: "2" }}>모집글</STButton>
                                    <STButton style={{ width: "70px", flex: "2" }}>{post.category}</STButton>
                                    <STButton2 style={{ color: "#424754", backgroundColor: "white", width: "208px", flex: "4" }}>약속날짜 | {post.date}</STButton2>
                                </STBox2>
                                <STBox2 style={{ marginBottom: "14px", display: "flex" }}>
                                    <STButton2 style={{ width: "159px", flex: "2" }}>모집인원 | {post.number}명</STButton2>
                                    <STButton2 style={{ width: "67px", flex: "1" }}><img src={sexSvg} /></STButton2>
                                    <STButton2 style={{ width: "162px", flex: "2" }}>나이대 | {post.startAge}~{post.endAge}</STButton2>
                                </STBox2>
                                <STInput style={{ marginBottom: "8px" }}>{post.title}</STInput>

                                <div>
                                    <Carousel>
                                        {
                                            post.postImgInfo
                                            && post.postImgInfo.map((img, i) => {
                                                return (
                                                    <Carousel.Item key={img.id + i}>
                                                        <img style={{ width: "100%", height: "396px", objectFit: "contain" }}
                                                            src={img.postImgUrl} />
                                                    </Carousel.Item>)
                                            })
                                        }
                                    </Carousel>
                                </div>
                                <StContent style={{ marginBottom: "14px", paddingTop: "5px" }}>{post.content}</StContent>

                                <div>카카오 링크</div>
                                <STInput style={{ marginBottom: "14px" }}>{post.kakaoLink}</STInput>

                                <div>행사장 링크</div>
                                <STInput style={{ marginBottom: "14px" }}>{post.postLink}</STInput>

                                {
                                    modPost.postAddress && (
                                        <>
                                            <div>행사장소</div>
                                            <div style={{ marginBottom: "8px", display: "flex" }}>
                                                <STAddressButton style={{ flex: "1" }}>#{modPost.postAddress.split(' ')[0].length < 2 ? modPost.postAddress.split(' ')[0] : modPost.postAddress.split(' ')[0].substr(0, 2)}</STAddressButton>
                                                <STInput style={{ marginLeft: "5px", flex: "4" }}>{post.postAddress}</STInput>
                                            </div>
                                        </>
                                    )
                                }

                                <KakaoMap address={post.postAddress} width='100%' height='144px' />


                                {localStorage.getItem('userId') === post.userId.toString() &&
                                    (<div style={{ float: "right" }}>
                                        <STEditButton onClick={toggleEdit}>수정</STEditButton>
                                        <STEditButton style={{ background: "#515466", marginRight: "5px" }} onClick={() => { onGatherDelete(postId); }}>삭제</STEditButton>
                                    </div>)}

                            </>
                        )
                }


                <Comment postId={postId} kind='gather' commentDtoList={post.commentDtoList} />

            </StWrap>
    );
};

export default Gather;

const STSelect = styled.select`
    height : 48px;
    font-size: 16px;
    background-color: #FFF;
    border-radius: 30px;
    padding:12px 16px;
    border: none;
    flex : 1;
    /* border:2px solid #B8C4FF; */
`

const AllInput = styled.input`
    border-radius: 10px;
    background-color: #F4F4F4;
    border : transparent;
    font-size: 14px;
    height : 32px;
    margin-right: 7px;
`
const AllTextarea = styled.textarea`
    border-radius: 10px;
    border: transparent;
    width :100%;
    background-color: white;
    padding-left: 10px;
    padding-top:10px;
`
const STNumber = styled.div`
    border-radius: 8px;
    background-color: #F4F4F4;
    font-size: 14px;
    /* float: right; */
    text-align: center;
    height : 32px;
`
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
    left : 94px;
    margin-left: 10px;
`
const SelectWrap = styled.div`
width: 100%;
height: auto;

`

const SelTop = styled.div`
display: flex;
gap: 15px;
margin-bottom : 10px;
`

const SelBottom = styled.div`
display: flex;
justify-content : space-between;
gap: 15px;
/* .dateform {
    border-radius : 30px;
    height : 48px;
    flex : 1;
    border: none;
} */
`

// const AllTextarea = styled.textarea`
//     border-radius: 10px;
//     border: transparent;
//     padding-left: 10px;
//     padding-top: 10px;
// `
const STInput2 = styled.input`
    height : 48px;
    font-size: 16px;
    background-color: #FFF;
    border-radius: 30px;
    padding:12px 16px;
    border: none;
    flex : 1;
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

const StRadioBox = styled.div`
    width : 110px;
    display : flex;
    flex-direction : row;
    align-items : center;
    gap : 10px;
    label {
        font-family : 'Pretendard Variable';
    }
    .form-check-input:checked {
        background-color : #15DD95;
    }
    .form-switch .form-check-input {
        width : 52px;
        height : 32px;
        background-image : url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e");
    }
    .form-check-input{
        background-color : #aff5db;
        box-shadow : none;
        border : none;
    }
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
const STDiv = styled.div`
    height : 48px;
    font-size: 14px;
    background-color: #FFF;
    border-radius: 30px;
    /* padding:12px 16px; */
    border: transparent;
    position: relative;
    line-height: 40px; 
    /* flex : 1; */
`
const STCountButton = styled.button`
    background-color: #E1E3EC;
    font-size: 20px;
    border-radius: 20px;
    border:transparent;
    /* vertical-align: middle; */
    height : 30px;
    position : absolute;
    transform: translateY(-50%);
    top : 50%;
    padding-left: 10px;
    padding-right : 10px;
`