import React, { useState, useRef } from 'react';
import { FiSearch } from 'react-icons/fi'
import { StSearchBox, AddressBox, ModalWrap, STButton, STSelectButton, AllButton, STInput, AllTextarea, STSelect, STDiv, STInput2, STAddressButton, STInput3 } from '../styles/AddPost.styled'
//kakao 주소 관련
import SearchAddress from './SearchAddress';
import KakaoMap from '../../components/common/KakaoMap'
//부트스트랩
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import Layout from '../layout/Layout'
import noImg from '../../assets/images/common/noImg.png'

import useImgUpload from '../../hooks/useImgUpload';
import useInput from '../../hooks/useInput';
import { insertPost } from '../../firestore/module/post';
import { createPostPart } from '../../firestore/module/postPart';
import { fsUploadImage } from '../../firestore/module/image';
import { writeTime } from '../common/Date';


const GatherPost = () => {

    //주소 API useState
    const [postAddress, setPostAddress] = useState("")

    //이미지 업로드 훅
    const [files, fileUrls, uploadHandle] = useImgUpload(5, true, 0.5, 1000);

    //이미지 업로드 인풋돔 선택 훅
    const imgRef = useRef();

    //2-2 게시글 작성 - 모집글

    //모집인원
    const [memberCounter, setMemberCounter] = useState(0);

    const memberCounterAdd = (e) => {
        setMemberCounter(memberCounter + 1);
    }

    const memberCounterMinus = (e) => {
        if (memberCounter > 0) {
            setMemberCounter(memberCounter - 1)
        }
    }
    // 남녀 성비
    const [sexValue, setSexValue] = useState('');

    const sexs = [
        { name: '성비무관', value: 'NF' },
        { name: '남', value: 'M' },
        { name: '여', value: 'W' },
    ];

    //나머지 내용
    const [gatherPosts, setGatherPosts, gatherPostsHandle] = useInput({
        category: "",
        date: "",
        kakaoLink: "",
        //sex:"",
        startAge: "",
        endAge: "",
        title: "",
        content: "",
        postLink: "",
        postAddress: "",
        detailAddress: ""
    })

    const onSubmit = () => {

        // //모집인원, 카테고리, 성비관련, 행사시작, 연령대, 제목, 내용, 카카오링크
        if (gatherPosts.title === "") { return alert('제목을 입력하세요') }
        if (gatherPosts.content === "") { return alert('내용을 입력하세요') }
        if (gatherPosts.category === "") { return alert('카테고리를 입력하세요') }
        if (memberCounter < 1) { return alert('모집인원을 입력하세요') }
        if (gatherPosts.startAge === "" || gatherPosts.endAge === "") { return alert('연령대를 입력하세요') }
        if (sexValue === "") { return (alert('성비를 선택하세요')) }
        if (gatherPosts.date === "") { return alert('만날 날짜를 입력하세요') }
        if (gatherPosts.kakaoLink === "") { return alert('연락할 카카오 링크를 입력하세요') }
        if (postAddress === "") { return alert('함께 만날 주소를 입력해주세요') }

        // //링크 검사(행사장링크 필수 아님)
        const link = /(http|https):\/\//.test(gatherPosts.postLink)
        if (gatherPosts.postLink !== "") {
            if (link === false) {
                return alert("'http://' 또는 'https://'가 포함된 링크를 입력해주세요.")
            }
        }

        const obj = {
            category: gatherPosts.category,
            dateToMeet: gatherPosts.date,
            memberCounter,
            kakaoLink: gatherPosts.kakaoLink,
            sex: sexValue,
            startAge: gatherPosts.startAge,
            endAge: gatherPosts.endAge,
            title: gatherPosts.title,
            content: gatherPosts.content,
            postLink: gatherPosts.postLink,
            contentType: "gather",
            postAddress: postAddress + gatherPosts.detailAddress,
            writer: localStorage.getItem('uid'),
            writeTime: writeTime,
            writerNickName: localStorage.getItem('nickname'),
            writerProfileImg: localStorage.getItem('profile_image_url'),
            photoURIs: [],
        }

        if (files.length > 0) {
            files.map(async (file, i) => {
                const getImageURI = await fsUploadImage("images/post", file, `${localStorage.getItem('uid')}_${file.name}_${writeTime}`);
                obj.photoURIs.push(getImageURI);
                if (files.length === (i + 1)) {
                    insertPost(obj)
                        .then(response => {
                            const postID = response._key.path.segments[1];
                            createPostPart(postID)
                                .then(() => {
                                    window.location.replace(`/gather/${postID}`);
                                })
                                .catch(error => {
                                    console.log("createPostPart error", error)
                                })
                        })
                        .catch(error => {
                            console.log("fireStore insert error", error);
                        })
                }
            })
        } else {
            insertPost(obj)
                .then(response => {
                    const postID = response._key.path.segments[1];
                    createPostPart(postID)
                        .then(() => {
                            window.location.replace(`/event/${postID}`);
                        })
                        .catch(error => {
                            console.log("createPostPart error", error)
                        })
                })
                .catch(error => {
                    console.log("fireStore insert error", error);
                })
        }
    }



    // 주소 API 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const popupPostCode = () => {
        setIsPopupOpen(!isPopupOpen)
    }

    //날짜 제한
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear()

    const today2 = year + '-' + month + '-' + day;

    //주소 앞에 두글자 따기
    const region = postAddress.split("")[0] + postAddress.split("")[1]

    return (
        <>

            <Layout style={{ height: "100%" }}>
                <div style={{ paddingLeft: "10px", paddingRight: "10px", height: "100%" }}>
                    <h4 style={{ textAlign: "center", marginTop: "18px", marginBottom: "18px" }}>모집글</h4>


                    <div style={{ marginBottom: "14px" }}>
                        <STInput type="text" placeholder="제목" name="title" onChange={gatherPostsHandle} style={{ width: "100%" }} />
                    </div>

                    {fileUrls.length === 0 && <img src={noImg} style={{ width: "100%" }} onClick={() => { imgRef.current.click() }} alt="no image" />}

                    <div >
                        <label htmlFor="files">
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="files"
                                onChange={uploadHandle}
                                accept="image/*"
                                ref={imgRef}
                                name="files"
                                multiple />
                        </label>
                        <Carousel>
                            {
                                fileUrls && fileUrls.map((img, i) => {
                                    return (
                                        <Carousel.Item key={img.id}>
                                            <img style={{ width: '100%', height: "396px", objectFit: "contain" }} onClick={() => { imgRef.current.click() }} src={img} alt={"upload image" + i} />
                                        </Carousel.Item>
                                    )
                                })
                            }
                        </Carousel>

                    </div >
                    <div style={{ marginBottom: "10px" }}>*이미지를 다시 업로드 하려면 사진을 클릭해주세요.</div>

                    <AllTextarea type="text" placeholder="소개글" name="content" onChange={gatherPostsHandle} style={{}} />

                    <div style={{ display: "flex", marginBottom: "14px", gap: "10px" }}>
                        <STSelect name="category" onChange={gatherPostsHandle} style={{ flex: "0.9", textAlign: "center" }} >
                            <option>카테고리</option>
                            <option value="마라톤">마라톤</option>
                            <option value="페스티벌">페스티벌</option>
                            <option value="전시회">전시회</option>
                            <option value="공연">공연</option>
                            <option value="기타">기타</option>
                        </STSelect>
                        <STDiv style={{ flex: "1", textAlign: "center", display: "flex" }}>
                            <STButton style={{ flex: "0.7" }} onClick={memberCounterAdd}>+</STButton>
                            <div style={{ flex: "2", lineHeight: "40px" }}>{memberCounter === 0 ? "모집인원" : memberCounter}</div>
                            <STButton style={{ flex: "0.7", right: "0px" }} onClick={memberCounterMinus}>-</STButton>
                        </STDiv>
                    </div>

                    <label style={{ marginLeft: "3px" }}>연령대</label><br />
                    <div style={{ flex: "1", display: "flex", marginTop: "5px" }}>
                        <STInput2 type="text" placeholder='나이' style={{ width: "50%", textAlign: "center" }} name="startAge" onChange={gatherPostsHandle} />
                        <p style={{ paddingTop: "13px" }}>~</p>
                        <STInput2 type="text" placeholder='나이' style={{ width: "50%", textAlign: "center" }} name="endAge" onChange={gatherPostsHandle} />
                    </div>

                    <div style={{ display: "flex", marginTop: "10px", marginLeft: "3px" }}>
                        <div style={{ flex: "1" }}>만날 날짜</div>
                        <div style={{ flex: "1" }}>성비관련</div>
                    </div>

                    <div style={{ display: "flex", marginTop: "5px" }}>
                        <STInput2 type="date" name="date" onChange={gatherPostsHandle} min={today2} style={{ flex: "0.8", textAlign: "center" }} />
                        <div style={{ flex: "1", marginLeft: "10px" }}>
                            <ButtonGroup className="mb-2" >
                                {sexs.map((radio, idx) => (
                                    <STSelectButton >
                                        <STSelectButton2
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant="secondary"
                                            name="radio"
                                            value={radio.value}
                                            checked={sexValue === radio.value}
                                            onChange={(e) => setSexValue(e.currentTarget.value)}>
                                            {radio.name}
                                        </STSelectButton2>
                                    </STSelectButton >
                                ))}
                            </ButtonGroup>
                        </div>
                    </div>

                    <div style={{ marginTop: "14px", marginBottom: "14px" }}>
                        <label>카카오 링크</label><br />
                        <STInput type="text" placeholder="링크" name="kakaoLink" onChange={gatherPostsHandle} style={{ width: "100%" }} />
                    </div>

                    <div style={{ marginBottom: "14px" }}>
                        <label>관련 링크</label><br />
                        <STInput type="text" placeholder="링크" name="postLink" onChange={gatherPostsHandle} style={{ width: "100%" }} />
                    </div>

                </div>
                <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    <StSearchBox style={{ background: "#E1E3EC" }} onClick={popupPostCode}>
                        <button style={{ color: "#8B909F" }}><FiSearch style={{ width: '20px', height: '20px', color: '#424754', marginLeft: "10px", marginRight: "10px" }} />주소검색</button>
                    </StSearchBox>

                    <AddressBox >
                        {
                            postAddress !== "" && (
                                <>
                                    <div style={{ display: "flex", marginBottom: "10px" }}>
                                        <STAddressButton style={{ marginRight: "10px", flex: "2" }}>{"#" + region}</STAddressButton>
                                        <STInput3 type="text" value={postAddress} style={{ flex: "8" }} readOnly>{postAddress}</STInput3>
                                    </div>
                                    <STInput type="text" name="detailAddress" placeholder='상세주소' onChange={gatherPostsHandle} style={{ width: "78%", marginBottom: "10px", float: "right" }} />
                                    <KakaoMap address={postAddress} width="328px" height="300px" />
                                </>)
                        }
                    </AddressBox >
                </div>
                {isPopupOpen && (
                    <ModalWrap onClick={popupPostCode}>
                        <SearchAddress setPostAddres={setPostAddress} popupPostCode={popupPostCode} />
                    </ModalWrap>
                )}

                <div>
                    <AllButton style={{ background: "#3556E1", color: "white" }} onClick={onSubmit}>등록하기</AllButton>
                </div>
            </Layout>

        </>
    )
}

export default GatherPost;

const STSelectButton2 = styled(ToggleButton)`
    background-color: white;
    border : transparent;
    height : 48px;
    color: black;
    border-radius: 5px;
    padding-top: 13px;
`