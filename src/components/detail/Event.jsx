import React, { useState, useRef, useEffect } from 'react';
import Comment from '../common/Comment';
import { FiSearch } from 'react-icons/fi';
import {
    STLinkTextarea, STInput3, ModalWrap, StWrap, StCarouselWrap, STUploadButton, StTypeBox, STIng, STIngDiv, STUsername, STInput, STButton, STBox2, StContent, STAddressButton, STEditButton, STImg, SelTop, SelBottom, STSelect, STDateInput, STTitleInput, STContentTextarea, StSearchBox, STAddressDiv
} from '../styles/DetailPost.styled.js'
import useImgUpload from "../../hooks/useImgUpload";
import { __deletePost, __putPost } from '../../redux/modules/postSlice';
import { useDispatch } from 'react-redux';
import Views from '../../assets/icon/Views.svg'
import Carousel from 'react-bootstrap/Carousel';
import noImg from '../../assets/images/common/noImg.jpg'
//kakao 주소 관련
import SearchAddress from '../post/SearchAddress';
import KakaoMap from '../common/KakaoMap';

// 스크랩
import { __postScrap } from '../../redux/modules/postSlice';
import PostScrap from './PostScrap';

const Event = ({ post, postId, modPost, setmodPost, modPostHandle }) => {

    const dispatch = useDispatch();

    //상세글 수정하기 상태
    const [mod, setMod] = useState(false);

    // 주소 API 팝업창 상태 관리
    const [isAddressModal, setIsAddressModal] = useState(false);
    //주소 API useState
    const [postAddress, setPostAddress] = useState(post.postAddress);

    const popupPostCode = () => {
        setIsAddressModal(!isAddressModal)

    }

    useEffect(() => {
        if (postAddress !== "") {
            setmodPost({ ...modPost, postAddress })
        }
    }, [postAddress])

    //이미지 업로드 훅
    const [files, fileUrls, uploadHandle, setImgFiles, setImgUrls] = useImgUpload(5, true, 0.5, 1000);
    const imgRef = useRef();

    //기존 프리뷰 지울 state
    const [delImg, setDelImg] = useState([]);

    console.log(post)

    //submit
    const putPostSubmit = () => {

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
            category: modPost.category,
            startPeriod: modPost.startPeriod,
            endPeriod: modPost.endPeriod,
            title: modPost.title,
            content: modPost.content,
            postLink: modPost.postLink,
            postAddress: modPost.postAddress + detail
        }

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

    //새로추가한 글 삭제할 이미지
    function deleteNewFile(e) {
        const imgurls = fileUrls.filter((imgUrl, index) => index !== e);
        setImgUrls(imgurls);

        const imgdelete = files.filter((file, index) => index !== e);
        setImgFiles(imgdelete);
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

                        <STIng style={{ margin: "14px 0" }}>
                            <div style={{ display: "flex" }}>
                                <div>
                                    {post.postState === "진행중" ?
                                        (<STIngDiv><div>{post.postState}</div></STIngDiv>)
                                        :
                                        (<STIngDiv style={{ background: "#727785" }}>{post.postState}</STIngDiv>)
                                    }
                                </div>
                                <div>
                                    <STImg>
                                        <div style={{ background: "white", width: "70px", height: "45px" }}>
                                            <div style={{ margin: "0 5px 0 18px", paddingTop: "10px" }}>
                                                <img src={Views} style={{ width: "20px", height: "20px", flex: "2", marginRight: "4px" }} />
                                                {post.viewCount}
                                            </div>
                                        </div>
                                    </STImg>
                                </div>

                            </div>
                            <div>
                                <PostScrap style={{ right: "0px" }} bookMarkStatus={post.bookMarkStatus} />
                            </div>

                        </STIng>

                        <STBox2 style={{ display: "flex" }}>
                            <STButton style={{ width: "65px", flex: "2" }}>행사글</STButton>
                            <STButton style={{ width: "70px", flex: "2" }}>{post.category}</STButton>
                            <STButton style={{ width: "110px", flex: "3" }}>{post.startPeriod}</STButton>
                            <span style={{ paddingTop: "8px" }}>~</span>
                            <STButton style={{ width: "110px", flex: "3" }}>{post.endPeriod}</STButton>
                        </STBox2>

                        <div style={{ margin: "10px 0" }}>
                            <img src={post.userImg} style={{ width: "36px", height: "36px", borderRadius: "30px" }} />
                            <STUsername>{post.username}</STUsername>
                        </div>

                        <STInput style={{ height: "48px" }}><p>{post.title}</p></STInput>

                        <StCarouselWrap>
                            <Carousel>
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
                        <StContent type='text' style={{ marginBottom: "14px" }} value={post.content || ""} readOnly />


                        <div>행사장 링크</div>
                        <STInput style={{ marginBottom: "14px" }}>{post.postLink}</STInput>

                        {
                            modPost.postAddress && (
                                <>
                                    <div>행사장소</div>
                                    <div style={{ display: "flex", marginBottom: "8px" }}>
                                        <STAddressButton style={{ flex: "2" }}>#{modPost.postAddress.split('')[0] + modPost.postAddress.split('')[1]}</STAddressButton>
                                        <STInput style={{ flex: "8", marginLeft: "5px" }}>{post.postAddress}</STInput>
                                    </div>
                                </>
                            )
                        }



                        <KakaoMap address={post.postAddress} width='100%' height='144px' />

                        {localStorage.getItem('userId') === post.userId.toString() &&
                            (<div>
                                <STEditButton style={{ background: "#515466", marginLeft: "5px" }} onClick={() => { onEventDelete(postId); }}>삭제</STEditButton>
                                <STEditButton onClick={() => { setMod(true) }}>수정</STEditButton>
                            </div>)}
                    </>
                    :

                    <>
                        <h4 style={{ textAlign: "center", marginTop: "18px", marginBottom: "18px" }}>행사글</h4>
                        <STTitleInput type='text' name='title' value={modPost.title || ""} onChange={modPostHandle} />

                        <StCarouselWrap>

                            <Carousel>
                                {delImg === "" || modPost.postImgInfo.length - delImg.length > 0 &&
                                    modPost.postImgInfo
                                        .filter((item, i) => delImg.indexOf(item.postImgId) === -1)
                                        .map((imgInfo, i) => {
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

                                {fileUrls && fileUrls.map((imgUrl, i) => {
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
                                fileUrls && fileUrls.map((imgUrl, index) => {
                                    return (
                                        <button key={imgUrl} onClick={() => deleteNewFile(index)}>
                                            <img style={{ width: '60px', height: '60px' }} src={imgUrl} alt="" />
                                        </button>
                                    )
                                })
                            }

                        </StCarouselWrap>
                        <div>* '+'버튼 옆에 있는 사진을 클릭하면 삭제됩니다.</div>

                        <STContentTextarea style={{ height: "200px" }} name='content' value={modPost.content || ""} onChange={modPostHandle} placeholder="행사글을 띄어쓰기 포함 2500자 이내로 입력해주세요" maxLength={2500}></STContentTextarea>

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
                                <STDateInput type="date" name="startPeriod" value={modPost.startPeriod || ""} onChange={modPostHandle} min={today2} />
                                <STDateInput type="date" name="endPeriod" value={modPost.endPeriod || ""} onChange={modPostHandle} min={today2} />
                            </SelBottom>
                        </StTypeBox>

                        <label style={{ marginLeft: "5px" }}>행사장 링크</label>
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
                                            <STAddressDiv style={{ marginRight: "5px" }}>#{modPost.postAddress.split(' ')[0].length < 2 ? modPost.postAddress.split(' ')[0] : modPost.postAddress.split(' ')[0].substr(0, 2)}</STAddressDiv>
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
                            <STEditButton style={{ background: "#515466", marginLeft: "5px" }} onClick={() => setMod(false)}>취소</STEditButton>
                            <STEditButton onClick={putPostSubmit}>수정완료</STEditButton>
                        </div>


                    </>
                }
                <Comment postId={postId} kind='event' commentDtoList={post.commentDtoList} style={{ marginTop: "20px" }} />
            </StWrap >
    );
};

export default Event;


