import React, { useEffect, useRef, useState } from 'react';
import Comment from '../common/Comment';
import KakaoMap from '../common/KakaoMap';
import Carousel from 'react-bootstrap/Carousel';
import { StContent, STLinkTextarea, STUsername, StCarouselWrap, STUploadButton, STIng, STImg2, STAddressButton, STEditButton, StSearchBox, StWrap, STInput, STContentTextarea, STInput3, STAddressDiv, ModalWrap } from '../styles/DetailPost.styled.js'

import SearchAddress from '../post/SearchAddress';
import useImgUpload from "../../hooks/useImgUpload";
import styled from 'styled-components';
import Views from '../../assets/icon/Views.svg'
import { FiSearch } from 'react-icons/fi';
// 스크랩
import PostScrap from './PostScrap';
import useInput from '../../hooks/useInput';
import PageState from '../common/PageState';
import TextAreaAutoResize from "react-textarea-autosize";
import { useGetPost, onDeletePost, onUpdate, updatePost } from '../../firestore/module/post';
import { writeTime } from '../common/Date';
import { useComment } from '../../firestore/module/comment';

const Ask = ({ postId }) => {


    const { post, postIsLoading } = useGetPost(postId);
    //업데이트 인풋
    const [modPost, setmodPost, modPostHandle] = useInput();
    //수정하기
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => {
        setEdit(!edit);
        setmodPost(post);
    };

    const { comments, commentUids, reCommentUids, commentsIsLoading } = useComment(postId);

    useEffect(() => {
        const isView = post.viewUsers.indexOf(localStorage.getItem("uid"));
        const copyViewUsers = [...post.viewUsers];
        if (isView === -1) {
            copyViewUsers.push(localStorage.getItem("uid"));
            updatePost(postId, { viewUsers: copyViewUsers });
        }
    }, [])

    //이미지 업로드 훅
    const [files, fileUrls, uploadHandle, setImgFiles, setImgUrls] = useImgUpload(5, true, 0.5, 1000);
    //기존 프리뷰 지울 state
    const [delImg, setDelImg] = useState([]);
    const [delImgName, setDelImgName] = useState([]);
    //이미지 업로드 인풋돔 선택 훅
    const imgRef = useRef();

    //submit
    const onSubmitAsk = () => {

        //링크 검사(행사장링크 필수 아님)
        const link = /(http|https):\/\//.test(modPost.postLink)
        if (modPost.postLink !== "") {
            if (link === false) {
                return alert("'http://' 또는 'https://'가 포함된 링크를 입력해주세요.")
            }
        }

        const detail = modPost.detailAddress === undefined ? "" : modPost.detailAddress

        const obj = {
            title: modPost.title,
            content: modPost.content,
            postLink: modPost.postLink,
            postAddress: modPost.postAddress,
            postAddressDetail: detail,
            writeTime: writeTime,
            writerNickName: localStorage.getItem('nickname'),
            writerProfileImg: localStorage.getItem('profile_image_url'),
            photoURIs: [...modPost.photoURIs.filter((item, i) => delImg.indexOf(item) === -1)],
        }

        onUpdate(delImgName, files, postId, obj);
    }


    //기존글의 삭제할 이미지
    const delImgHandle = (postImgURI) => {
        const firstIdx = postImgURI.indexOf(localStorage.getItem("uid"));
        const lastIdx = postImgURI.indexOf("?", firstIdx);
        const imgName = decodeURIComponent(postImgURI.substring(firstIdx, lastIdx));
        setDelImg((e) => [...e, postImgURI]);
        setDelImgName((e) => [...e, imgName])
    }

    // 주소 API 팝업창 상태 관리& useState
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const popupPostCode = () => { setIsPopupOpen(!isPopupOpen) }
    const [postAddress, setPostAddress] = useState("")

    useEffect(() => {
        if (postAddress !== "") {
            setmodPost({ ...modPost, postAddress })
        }
    }, [postAddress])

    //새로추가한 글 삭제할 이미지
    function deleteNewFile(e) {
        const imgurls = fileUrls.filter((imgUrl, index) => index !== e);
        setImgUrls(imgurls);

        const imgdelete = files.filter((file, index) => index !== e);
        setImgFiles(imgdelete);
    }
    if (postIsLoading && commentsIsLoading) {
        return < PageState
            display={'flex'}
            state='loading' imgWidth='25%' height='100vh'
            text='잠시만 기다려 주세요.' />;
    }
    return (
        <StWrap>
            {edit ?
                modPost !== undefined &&
                (
                    <div style={{ marginTop: "14px" }}>
                        <h4 style={{ textAlign: "center", marginTop: "18px", marginBottom: "18px" }}>질문글</h4>
                        <STInput3 type="text" placeholder="제목" name="title" defaultValue={modPost.title || ""} onChange={modPostHandle} style={{ width: "100%" }} />

                        <div><br />

                            {/*이미지 올리기*/}
                            <StCarouselWrap>
                                <Carousel>
                                    {delImg === "" || modPost.photoURIs.length - delImg.length > 0 && modPost.photoURIs[0] !== null &&
                                        modPost.photoURIs
                                            .filter((item, i) => delImg.indexOf(item) === -1)
                                            .map((img, i) => {
                                                return (
                                                    <Carousel.Item key={i}>
                                                        <img style={{ width: "100%", height: "396px", borderRadius: "10px", objectFit: "contain" }}
                                                            className="d-block w-100"
                                                            src={img}
                                                            alt={`slide${i + 1}`}
                                                        />
                                                    </Carousel.Item>
                                                )
                                            })}
                                    {fileUrls.map((imgUrl, i) => {
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
                                {modPost.photoURIs.map((img, i) => {
                                    return (
                                        img &&
                                        // <button style={{ width: '60px', height: '60px', backgroundImage: `url(${imgInfo.postImgUrl})` }} ></button>
                                        <button style={{ display: delImg.indexOf(img) > -1 ? "none" : "inline-block" }}
                                            onClick={() => delImgHandle(img)} key={i}>
                                            <img style={{ width: '60px', height: '60px' }} src={img} alt={'post image' + i} />
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
                                            <button key={imgUrl} onClick={() => deleteNewFile(i)}>
                                                <img style={{ width: '60px', height: '60px' }} src={imgUrl} alt={"pre view" + i} />
                                            </button>
                                        )
                                    })
                                }

                            </StCarouselWrap>
                            <div>* '+'버튼 옆에 있는 사진을 클릭하면 사진 선택이 취소됩니다.</div>
                        </div>

                        {/* <STContentTextarea style={{ height: "200px", marginTop: "14px", marginBottom: "14px" }} type="text" name="content" defaultValue={modPost.content || ""} onChange={modPostHandle} /> */}
                        <TextAreaAutoResize
                            name='content' value={modPost.content || ""} onChange={modPostHandle}
                            defaultValue={post.content}
                            minRows={10}
                            maxLength={2500}
                            placeholder="행사글을 띄어쓰기 포함 2500자 이내로 입력해주세요"
                            style={{
                                width: "100%",
                                resize: "none",
                                outline: "none",
                                overflow: "hidden",
                                border: "none",
                                borderRadius: "5px",
                            }}
                        />

                        <label>관련 링크</label><br />
                        <STLinkTextarea type="text" name="postLink" defaultValue={modPost.postLink} onChange={modPostHandle} style={{ width: "100%", marginBottom: "14px" }} />

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
                                            <STAddressDiv style={{ flex: "1" }}>#{modPost.postAddress.split(' ')[0].length < 2 ? modPost.postAddress.split(' ')[0] : modPost.postAddress.split(' ')[0].substring(0, 2)}</STAddressDiv>
                                            <STInput style={{ flex: "4", marginLeft: "10px" }}>{`${modPost.postAddress} ${modPost.postAddressDetail}`}</STInput>
                                        </div>

                                    </>
                                )
                            }

                            {
                                modPost.postAddress !== post.postAddress && <STInput3 style={{ float: "right", width: "79%", height: "40px", marginBottom: "10px" }} type="text" placeholder='상세주소' name="detailAddress" onChange={modPostHandle} />
                            }
                            <KakaoMap address={modPost.postAddress} width='100%' height='130px' />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <STEditButton style={{ background: "#515466", marginLeft: "5px" }} onClick={toggleEdit}>취소</STEditButton>
                            <STEditButton onClick={onSubmitAsk} >수정완료</STEditButton>
                        </div>
                    </div>
                )
                :
                post === undefined ?
                    <PageState display='flex'
                        flexDirection='column' state='notFound' imgWidth='25%' height='100vh'
                        text='삭제된 게시글 입니다.' />
                    :
                    (
                        <>
                            <STIng style={{ margin: "14px 0" }}>
                                <div>
                                    <STImg2>
                                        <div style={{ margin: "0 5px 0 18px", paddingTop: "10px" }}>
                                            <img src={Views} style={{ width: "20px", height: "20px", flex: "2", marginRight: "4px" }} alt="views icon" />
                                        </div>
                                        <div style={{ margin: "10px 20px 0 0 " }}> {post.viewUsers.length}</div>

                                    </STImg2>
                                </div>
                                <div>
                                    <PostScrap style={{ position: "absolute", right: "10px" }} postId={postId} scrapUsers={post.scrapUsers} />
                                </div>

                            </STIng>
                            <div style={{ marginBottom: "14px" }}>
                                <img src={post.writerProfileImg} style={{ width: "36px", height: "36px", borderRadius: "30px" }} alt="user image"
                                    onError={(e) => {
                                        e.target.src = `${process.env.PUBLIC_URL}/kakao_base_profil.jpg`
                                    }} />
                                <STUsername>{post.writerNickName}</STUsername>
                            </div>

                            <STInput style={{ height: "48px", marginBottom: "8px" }}>{post.title}</STInput>

                            <div>
                                <Carousel >
                                    {
                                        post.photoURIs
                                        && post.photoURIs.map((img, i) => {
                                            return (
                                                <Carousel.Item key={i}>
                                                    <Img style={{ width: "100%", height: "396px", borderRadius: "10px", objectFit: "contain" }}
                                                        src={img} alt={"ask post" + i} />
                                                </Carousel.Item>)
                                        })
                                    }
                                </Carousel>
                            </div>

                            {/* <StContent style={{ marginBottom: "14px", padding: "5px", borderRadius: "10px" }} value={post.content || ""} readOnly /> */}
                            <TextAreaAutoResize
                                defaultValue={post.content}
                                minRows={10}
                                style={{
                                    resize: "none",
                                    outline: "none",
                                    overflow: "hidden",
                                    border: "none",
                                    borderRadius: "5px",
                                }}
                                readOnly
                            />


                            {post.postLink !== "" &&
                                <div>
                                    <div>관련 링크</div>
                                    <STInput style={{ marginBottom: "14px", minHeight: "40px", padding: "5px" }}>
                                        <a href={post.postLink} target="_blank">{post.postLink}</a>
                                    </STInput>
                                </div>}

                            {
                                post.postAddress && (
                                    <>
                                        <div>행사장소</div>
                                        <div style={{ display: "flex", marginBottom: "8px" }}>
                                            <STAddressButton style={{ flex: "2" }}>#{post.postAddress.split(' ')[0].length < 2 ? post.postAddress.split(' ')[0] : post.postAddress.split(' ')[0].substring(0, 2)}</STAddressButton>
                                            <STInput style={{ flex: "8", marginLeft: "5px" }}>{`${post.postAddress} ${post.postAddressDetail}`}</STInput  >
                                        </div>
                                        <KakaoMap address={post.postAddress} width='100%' height='144px' />
                                    </>
                                )
                            }

                            {localStorage.getItem('uid') === post.writer &&
                                (<div>
                                    <STEditButton style={{ background: "#515466", marginLeft: "5px" }} onClick={() => { onDeletePost(postId, post.photoURIs); }}>삭제</STEditButton>
                                    <STEditButton onClick={toggleEdit}>수정</STEditButton>
                                </div>)}
                        </>
                    )}
            <Comment postId={postId}
                comments={comments}
                commentUids={commentUids}
                reCommentUids={reCommentUids}
                style={{ marginTop: "20px" }} />

        </StWrap >
    );
};

export default Ask;

const Img = styled.img`
    z-index : 1 !important;
`