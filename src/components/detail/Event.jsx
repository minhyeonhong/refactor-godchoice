import React, { useState, useRef, useEffect } from 'react';
import Comment from '../common/Comment';
import { FiSearch } from 'react-icons/fi';
import {
    STLinkTextarea, STInput3, ModalWrap, StWrap, StCarouselWrap, STUploadButton, StTypeBox, STIng, STIngDiv, STUsername, STInput, STButton, STBox2, StContent, STAddressButton, STEditButton, STImg, SelTop, SelBottom, STSelect, STDateInput, STTitleInput, StSearchBox, STAddressDiv
} from '../styles/DetailPost.styled.js'
import useImgUpload from "../../hooks/useImgUpload";
import Views from '../../assets/icon/Views.svg'
import Carousel from 'react-bootstrap/Carousel';
//kakao 주소 관련
import SearchAddress from '../post/SearchAddress';
import KakaoMap from '../common/KakaoMap';

// 스크랩
import PostScrap from './PostScrap';
import useInput from '../../hooks/useInput';
import PageState from '../common/PageState';
import styled from 'styled-components';
import TextAreaAutoResize from "react-textarea-autosize";
import { today, writeTime } from '../common/Date';
import { useGetPost, onDeletePost, onUpdate, usePostParts, updateViewUsers } from '../../hooks/usePost';

const Event = ({ postId }) => {

    const { post, postIsLoading } = useGetPost(postId);

    //업데이트 인풋
    const [modPost, setmodPost, modPostHandle] = useInput();

    //상세글 수정하기 상태
    const [mod, setMod] = useState(false);

    const setUpdateMod = () => {
        setMod(!mod);
        setmodPost(post);
    }

    const { comments, scrapUsers, viewUsers, postPartIsLoading } = usePostParts(postId);

    useEffect(() => {
        const isView = viewUsers.indexOf(localStorage.getItem("uid"));
        const copyViewUsers = [...viewUsers];
        if (isView === -1) {
            copyViewUsers.push(localStorage.getItem("uid"));
            updateViewUsers(postId, copyViewUsers);
        }
    }, [])

    // 주소 API 팝업창 상태 관리
    const [isAddressModal, setIsAddressModal] = useState(false);
    // //주소 API useState
    const [postAddress, setPostAddress] = useState("");

    const popupPostCode = () => {
        setIsAddressModal(!isAddressModal)
    }

    useEffect(() => {
        if (postAddress !== "") {
            setmodPost({ ...modPost, postAddress })
        }
    }, [postAddress])

    // //이미지 업로드 훅
    const [files, fileUrls, uploadHandle, setImgFiles, setImgUrls] = useImgUpload(5, true, 0.5, 1000);
    const imgRef = useRef();

    // //기존 프리뷰 지울 state
    const [delImg, setDelImg] = useState([]);
    const [delImgName, setDelImgName] = useState([]);


    //submit
    const putPostSubmit = () => {
        //카테고리, 행사시작, 행사마감, 글작성, content 검사
        if (modPost.title === "") { return alert('제목을 입력하세요') }
        if (modPost.content === "") { return alert('내용을 입력하세요') }
        if (modPost.category === "") { return alert('카테고리를 입력하세요') }
        if (modPost.startPeriod === "") { return alert('행사시작 일자를 입력하세요') }
        if (modPost.endPeriod === "") { return alert('행사마감 일자를 입력하세요') }

        //링크 검사(행사장링크 필수 아님)
        const link = /(http|https):\/\//.test(modPost.postLink)
        if (modPost.postLink !== "") {
            if (link === false) {
                return alert("'http://' 또는 'https://'가 포함된 링크를 입력해주세요.")
            }
        }

        const detailAddress = modPost.detailAddress === undefined ? "" : modPost.detailAddress

        const obj = {
            category: modPost.category,
            startPeriod: modPost.startPeriod,
            endPeriod: modPost.endPeriod,
            title: modPost.title,
            content: modPost.content,
            contentType: modPost.contentType,
            postAddress: modPost.postAddress + detailAddress,
            postLink: modPost.postLink,
            //writer: localStorage.getItem('uid'),
            writeTime: writeTime,
            writerNickName: localStorage.getItem('nickname'),
            writerProfileImg: localStorage.getItem('profile_image_url'),
            photoURIs: [...modPost.photoURIs.filter((item, i) => delImg.indexOf(item) === -1)],
        }

        onUpdate(delImgName, files, postId, obj);
    }

    const categoryOption = ['마라톤', '페스티벌', '전시회', '공연', '기타'];

    // //기존글의 삭제할 이미지
    const delImgHandle = (postImgURI) => {
        const firstIdx = postImgURI.indexOf(localStorage.getItem("uid"));
        const lastIdx = postImgURI.indexOf("?", firstIdx);
        const imgName = decodeURI(postImgURI.substring(firstIdx, lastIdx));
        setDelImg((e) => [...e, postImgURI]);
        setDelImgName((e) => [...e, imgName])
    }

    // //새로추가한 글 삭제할 이미지
    function deleteNewFile(e) {
        const imgurls = fileUrls.filter((imgUrl, index) => index !== e);
        setImgUrls(imgurls);

        const imgdelete = files.filter((file, index) => index !== e);
        setImgFiles(imgdelete);
    }

    if (postIsLoading && postPartIsLoading) {
        return < PageState
            display={'flex'}
            state='loading' imgWidth='25%' height='100vh'
            text='잠시만 기다려 주세요.' />;
    }


    return (
        <StWrap>
            {!mod ?
                post === undefined ?
                    <PageState display='flex'
                        flexDirection='column' state='notFound' imgWidth='25%' height='100vh'
                        text='삭제된 게시글 입니다.' />
                    :
                    <>
                        <STIng style={{ margin: "14px 0" }}>
                            <div style={{ display: "flex" }}>
                                <div>
                                    {post.endPeriod >= today ?
                                        (<STIngDiv><div>진행중</div></STIngDiv>)
                                        :
                                        (<STIngDiv style={{ background: "#727785" }}>종료</STIngDiv>)
                                    }
                                </div>
                                <div>
                                    <STImg>
                                        <div style={{ background: "white", width: "70px", height: "45px" }}>
                                            <div style={{ margin: "0 5px 0 18px", paddingTop: "10px" }}>
                                                <img src={Views} style={{ width: "20px", height: "20px", flex: "2", marginRight: "4px" }} alt="views icon" />
                                                {viewUsers.length}
                                            </div>
                                        </div>
                                    </STImg>
                                </div>

                            </div>
                            <div>
                                <PostScrap style={{ right: "0px" }} postId={postId} scrapUsers={scrapUsers} />
                            </div>

                        </STIng>

                        <STBox2 style={{ display: "flex" }}>
                            <STButton style={{ width: "65px", flex: "2", padding: "0 3px", fontSize: "15px" }}>행사글</STButton>
                            <STButton style={{ width: "70px", flex: "2", padding: "0 3px", fontSize: "15px" }}>{post.category}</STButton>
                            <STButton style={{ width: "110px", flex: "3", padding: "0 3px", fontSize: "15px" }}>{post.startPeriod}</STButton>
                            <span style={{ paddingTop: "8px" }}>~</span>
                            <STButton style={{ width: "110px", flex: "3", padding: "0 3px", fontSize: "15px" }}>{post.endPeriod}</STButton>
                        </STBox2>

                        <div style={{ margin: "10px 0" }}>

                            <img
                                src={post.writerProfileImg}
                                onError={(e) => {
                                    e.target.src = `${process.env.PUBLIC_URL}/kakao_base_profil.jpg`
                                }}
                                style={{ width: "36px", height: "36px", borderRadius: "30px" }}
                                alt="user iamage"
                            />
                            <STUsername>{post.writerNickName}</STUsername>
                        </div>

                        <STInput style={{ height: "48px" }}><p>{post.title}</p></STInput>

                        <StCarouselWrap>
                            <Carousel>
                                {
                                    post.photoURIs !== undefined &&
                                    post.photoURIs.map((img, i) => {
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
                            </Carousel>
                        </StCarouselWrap>

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
                        {
                            post.postLink !== "" && (
                                <>
                                    <div>관련 링크</div>
                                    <STInput style={{ marginBottom: "14px", minHeight: "40px" }}>
                                        <a href={post.postLink} target="_blank">{post.postLink}</a>
                                    </STInput>
                                </>
                            )
                        }
                        {
                            post.postAddress && (
                                <>
                                    <div>행사장소</div>
                                    <div style={{ display: "flex", marginBottom: "8px" }}>
                                        <STAddressButton style={{ flex: "2" }}>#{post.postAddress.split('')[0] + post.postAddress.split('')[1]}</STAddressButton>
                                        <STInput style={{ flex: "8", marginLeft: "5px" }}>{post.postAddress}</STInput>
                                    </div>
                                </>
                            )
                        }
                        <KakaoMap address={post.postAddress} width='100%' height='144px' />

                        {localStorage.getItem('uid') === post.writer &&
                            (<div>
                                <STEditButton style={{ background: "#8f94b6", marginLeft: "5px" }} onClick={() => { onDeletePost(postId); }}>삭제</STEditButton>
                                <STEditButton onClick={setUpdateMod}>수정</STEditButton>
                            </div>)}

                    </>
                :
                modPost !== undefined &&
                <>
                    <h4 style={{ textAlign: "center", marginTop: "18px", marginBottom: "18px" }}>행사글</h4>
                    <STTitleInput type='text' name='title' value={modPost.title || ""} onChange={modPostHandle} />

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
                                    <Carousel.Item key={imgUrl.id}>
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
                                <button style={{ display: delImg.indexOf(img) > -1 ? "none" : "inline-block" }}
                                    onClick={() => delImgHandle(img)} key={i}>
                                    <img style={{ width: '60px', height: '60px' }} src={img} alt={"post image" + i} />
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
                            fileUrls && fileUrls.map((imgUrl, index) => {
                                return (
                                    <button key={imgUrl} onClick={() => deleteNewFile(index)}>
                                        <img style={{ width: '60px', height: '60px' }} src={imgUrl} alt={"pre view" + index} />
                                    </button>
                                )
                            })
                        }

                    </StCarouselWrap>
                    <div>* '+'버튼 옆에 있는 사진을 클릭하면 사진 선택이 취소됩니다.</div>
                    <div style={{ display: "flex" }}>
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
                    </div>

                    <StTypeBox>
                        <label style={{ marginLeft: "10px", marginTop: "14px" }}>카테고리</label>
                        <SelTop style={{ marginTop: "10px" }}>
                            <STSelect defaultValue={modPost.category} name="category" onChange={modPostHandle}>
                                {categoryOption.map((cate, i) => {
                                    return (
                                        <option value={cate} key={i}>{cate}</option>
                                    )
                                })}
                            </STSelect>
                        </SelTop>
                        <div style={{ display: "flex", marginLeft: "10px", marginBottom: "14px" }}>
                            <div style={{ flex: "1" }}>시작 날짜</div>
                            <div style={{ flex: "0.9" }}>마감 날짜</div>
                        </div>

                        <SelBottom style={{ marginBottom: "10px" }}>
                            <STDateInput type="date" name="startPeriod" value={modPost.startPeriod || ""} onChange={modPostHandle} min={today} />
                            <STDateInput type="date" name="endPeriod" value={modPost.endPeriod || ""} onChange={modPostHandle} min={today} />
                        </SelBottom>
                    </StTypeBox>

                    <label style={{ marginLeft: "5px" }}>관련 링크</label>
                    <STLinkTextarea type='text' name='postLink' value={modPost.postLink || ""} onChange={modPostHandle} />

                    <StSearchBox style={{ background: "#E1E3EC" }} onClick={popupPostCode}>
                        <button style={{ color: "#8B909F" }}><FiSearch style={{ width: '20px', height: '20px', color: '#424754', marginLeft: "10px", marginRight: "10px" }} />주소를 검색하려면 클릭해주세요</button>
                    </StSearchBox>

                    <div style={{ margin: "0px 20px" }}>
                        {isAddressModal && (
                            <ModalWrap onClick={popupPostCode}>
                                <SearchAddress setPostAddres={setPostAddress} popupPostCode={popupPostCode} />
                            </ModalWrap>
                        )}

                        {
                            modPost.postAddress && (
                                <>
                                    <div style={{ display: "flex", marginTop: "14px" }}>
                                        <STAddressDiv style={{ marginRight: "5px" }}>#{modPost.postAddress.split(' ')[0].substr(0, 2)}</STAddressDiv>
                                        <STInput >{modPost.postAddress}</STInput>
                                    </div>
                                </>
                            )
                        }
                        {
                            modPost.postAddress !== post.postAddress && <STInput3 style={{ marginBottom: "10px" }} type="text" placeholder='상세주소' name="detailAddress" onChange={modPostHandle} />
                        }

                        <KakaoMap address={modPost.postAddress} width='100%' height='130px' />
                    </div>


                    <div>
                        <STEditButton style={{ background: "#8f94b6", marginLeft: "5px" }} onClick={setUpdateMod}>취소</STEditButton>
                        <STEditButton onClick={putPostSubmit}>수정완료</STEditButton>
                    </div>


                </>
            }
            <Comment postId={postId} comments={comments} style={{ marginTop: "20px" }} />
        </StWrap >
    );
};

export default Event;


const STContentTextarea = styled.textarea`
    border-radius: 5px;
    border: transparent;
    width :100%;
    background-color: white;
    padding: 6px 10px;
    margin-top: 10px;
    /* min-height: ${(props) => (props.minHeight)}px; */
`
