import React, { useEffect, useRef, useState } from 'react';
import Comment from '../common/Comment';
import KakaoMap from '../common/KakaoMap';
import Carousel from 'react-bootstrap/Carousel';
import { StContent, STUsername, StCarouselWrap, STUploadButton, STIng, STImg2, STAddressButton, STEditButton, StSearchBox, StWrap, STInput, STContentTextarea, STInput3, STAddressDiv, ModalWrap } from '../styles/DetailPost.styled.js'

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
    const [files, fileUrls, uploadHandle, setImgFiles, setImgUrls] = useImgUpload(5, true, 0.5, 1000);
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

        //링크 검사(행사장링크 필수 아님)
        const link = /(http|https):\/\//.test(modPost.postLink)
        if (modPost.postLink !== "") {
            if (link === false) {
                return alert("'http://' 또는 'https://'가 포함된 링크를 입력해주세요.")
            }
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

    //새로추가한 글 삭제할 이미지
    function deleteNewFile(e) {
        const imgurls = fileUrls.filter((imgUrl, index) => index !== e);
        setImgUrls(imgurls);

        const imgdelete = files.filter((file, index) => index !== e);
        setImgFiles(imgdelete);
    }

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
                                    {delImg === "" || modPost.askPostImgList.length - delImg.length > 0 &&
                                        modPost.askPostImgList
                                            .filter((item, i) => delImg.indexOf(item.postImgId) === -1)
                                            .map((img, i) => {
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
                                    {fileUrls && fileUrls.map((imgUrl, i) => {
                                        return (
                                            <Carousel.Item key={i}>
                                                <img style={{ width: "100%", height: "396px", borderRadius: "10px", objectFit: "contain" }}
                                                    className="d-block w-100"
                                                    src={imgUrl}
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
                                            <button key={imgUrl} onClick={() => deleteNewFile(index)}>
                                                <img style={{ width: '60px', height: '60px' }} src={imgUrl} />
                                            </button>
                                        )
                                    })
                                }

                            </StCarouselWrap>
                            <div>* '+'버튼 옆에 있는 사진을 클릭하면 삭제됩니다.</div>
                        </div>

                        <STContentTextarea style={{ height: "200px", marginTop: "14px", marginBottom: "14px" }} type="text" name="content" defaultValue={modPost.content || ""} onChange={modPostHandle} />

                        <label>행사장 링크</label><br />
                        <STInput3 type="text" name="postLink" defaultValue={modPost.postLink} onChange={modPostHandle} style={{ width: "100%", marginBottom: "14px", height: "100px" }} />

                        <div>

                            <StSearchBox style={{ background: "#E1E3EC" }} onClick={popupPostCode}>
                                <button style={{ color: "#8B909F" }}><FiSearch style={{ width: '20px', height: '20px', color: '#424754', marginLeft: "10px", marginRight: "10px" }} />주소를 검색하려면 클릭해주세요</button>
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
                                            <STAddressDiv style={{ flex: "1" }}>#{modPost.postAddress.split(' ')[0].length < 2 ? modPost.postAddress.split(' ')[0] : modPost.postAddress.split(' ')[0].substr(0, 2)}</STAddressDiv>
                                            <STInput style={{ flex: "4", marginLeft: "10px" }}>{modPost.postAddress}</STInput>
                                        </div>
                                    </>
                                )
                            }

                            {
                                modPost.postAddress !== post.postAddress && <STInput3 style={{ float: "right", width: "79%", height: "40px", marginTop: "10px" }} type="text" placeholder='상세주소' name="detailAddress" onChange={modPostHandle} />
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
                            <STIng style={{ margin: "14px 0" }}>
                                <div>
                                    <STImg2>
                                        <div style={{ margin: "0 5px 0 18px", paddingTop: "10px" }}>
                                            <img src={Views} style={{ width: "20px", height: "20px", flex: "2", marginRight: "4px" }} />
                                        </div>
                                        <div style={{ margin: "10px 20px 0 0 " }}> {post.viewCount}</div>

                                    </STImg2>
                                </div>
                                <div>
                                    <PostScrap style={{ position: "absolute", right: "10px" }} bookMarkStatus={post.bookMarkStatus} />
                                </div>

                            </STIng>
                            <div style={{ marginBottom: "14px" }}>
                                <img src={post.userImg} style={{ width: "36px", height: "36px", borderRadius: "30px" }} />
                                <STUsername>{post.userName}</STUsername>
                            </div>

                            <STInput style={{ height: "48px", marginBottom: "8px" }}>{post.title}</STInput>

                            <div>
                                <Carousel >
                                    {
                                        post.askPostImgList
                                        && post.askPostImgList.map((img, i) => {
                                            return (
                                                <Carousel.Item key={img.id + i}>
                                                    <Img style={{ width: "100%", height: "396px", borderRadius: "10px", objectFit: "contain" }}
                                                        src={img.postImgUrl} />
                                                </Carousel.Item>)
                                        })
                                    }
                                </Carousel>
                            </div>

                            <StContent style={{ marginBottom: "14px", padding: "5px", borderRadius: "10px" }} value={post.content || ""} readOnly />

                            <div>행사장 링크</div>
                            <STInput style={{ marginBottom: "14px", minHeight: "40px", padding: "5px" }}>{post.postLink}</STInput>

                            {
                                modPost.postAddress && (
                                    <>
                                        <div>행사장소</div>
                                        <div style={{ display: "flex", marginBottom: "8px" }}>
                                            <STAddressButton style={{ flex: "2" }}>#{modPost.postAddress.split(' ')[0].length < 2 ? modPost.postAddress.split(' ')[0] : modPost.postAddress.split(' ')[0].substr(0, 2)}</STAddressButton>
                                            <STInput style={{ flex: "8", marginLeft: "5px" }}>{post.postAddress}</STInput  >
                                        </div>
                                    </>
                                )
                            }


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

const Img = styled.img`
    z-index : 1 !important;
`