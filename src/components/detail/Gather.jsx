import React, { useState,  useRef, useEffect } from 'react';
import Comment from '../common/Comment';
import KakaoMap from '../common/KakaoMap';
import Carousel from 'react-bootstrap/Carousel';
import { FiSearch } from 'react-icons/fi'
import imageCompression from 'browser-image-compression';
import {
    StWrap,
    StTitleBox,
    StImgBox,
    StContentBox,
    StEventLinkBox,
    StEventPlaceBox,
    StButtonBox
} from '../styles/Detail.styled'
import {ModalWrap, STButton, AddressBox} from '../styles/GatherDetail.styled'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import SearchAddress from '../post/SearchAddress';
import useImgUpload from "../../hooks/useImgUpload";
import {__deletePost, __putPost} from '../../redux/modules/PostSlice2'
import {useNavigate } from 'react-router-dom';
const Gather = ({post, postId, modPost, setmodPost, modPostHandle}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //수정하기
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => {setEdit(!edit);};

    // const {gatherPosts} = useSelector((state)=>(state.gatherPosts))
    // console.log(gatherPosts)
    //이미지 업로드 훅
    const [files, fileUrls, uploadHandle] = useImgUpload(5, true, 0.5, 1000);
    //기존 프리뷰 지울 state
    const [delImg, setDelImg] = useState([]);

    //이미지 업로드 인풋돔 선택 훅
    const imgRef = useRef();

    //submit
    const onSubmitGather = () => {

        if(counter<1){return (alert('모집인원을 입력하세요'))}
        if(modPost.kakaoLink===""){return (alert('연락할 카카오 링크를 입력하세요'))}
        if(modPost.sex===""){return (alert('성비를 선택하세요'))}
        if(modPost.startAge===""||modPost.endAge===""){return (alert('연령대를 입력하세요'))}
        if(modPost.title===""){return (alert('제목을 입력하세요'))}
        if(modPost.content===""){return (alert('내용을 입력하세요'))}
        if(modPost.category===""){return (alert('카테고리를 입력하세요'))}

        //링크 검사(행사장링크 필수 아님)
        const arr = modPost.postLink.indexOf("http://"||"https://") !==-1
        if(modPost.postLink!==""){
            if(arr===false){
                return(alert('http:// 또는 https://가 포함된 링크를 입력해주세요'))
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
        const detail  = modPost.detailAddress ===undefined? "":modPost.detailAddress 

        const obj = {
            category : modPost.category,
            content: modPost.content,
            date : modPost.date,
            endAge : modPost.endAge,
            imgId: delImg.join(),
            kakaoLink : modPost.kakaoLink,
            number : counter,
            postAddress: modPost.postAddress+detail,
            postLink: modPost.postLink,
            sex :  modPost.sex,
            startAge : modPost.startAge,
            title: modPost.title,
        }

        console.log("obj", obj);
        //폼 데이터에 글작성 데이터 넣기
        formData.append("gatherPostDto", new Blob([JSON.stringify(obj)], { type: "application/json" }));

        //Api 날리기
        dispatch(__putPost({ postId, content: formData }));
    }

    //날짜 제한
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear()
    const today2= year + '-' + month + '-' + day;

    //성별 관련
    const sex = post.sex==="W"? ("여"):(post.sex==="M"? ("남"):("상관없음"))

    //모집인원 counter 세기
    const [counter, setCounter] = useState(post.number);

    const handleAdd = () => {setCounter(counter+1);}

    const handleminus = ()=> {
        if(counter>0){
            setCounter(counter-1)
        }
    }

    useEffect(() => {
        if(post.number!== NaN){
            setCounter(post.number)
        }
    }, [post.number])

    // 주소 API 팝업창 상태 관리& useState
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const popupPostCode = () => {setIsPopupOpen(!isPopupOpen)}
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
    const onGatherDelete =(postId) => {
        dispatch(__deletePost(postId))
    }

    return (
        Object.keys(post).length < 1 ?
            <div>페이지 정보 없음</div>
            :
        <StWrap>

            {
                edit ? 
                (
                    <div>

                        <button>모집글</button>

                        <STSelect name="category" defaultValue={modPost.category||""} onChange={modPostHandle}>
                            <option value="마라톤">마라톤</option>
                            <option value="페스티벌">페스티벌</option>
                            <option value="전시회">전시회</option>
                            <option value="공연">공연</option>
                            <option value="기타">기타</option>
                        </STSelect>

                        <AllInput type="date" name="date" defaultValue={modPost.date||""} onChange={modPostHandle} min={today2} />
                        <AllInput type="text" defaultValue={modPost.startAge} name="startAge" onChange={modPostHandle} /> ~ {''}
                        <AllInput type="text" defaultValue={modPost.endAge} name="endAge" onChange={modPostHandle} />
                        
                        <STSelect name="category" defaultValue={modPost.sex} onChange={modPostHandle}>
                            <option value="NF">성비무관</option>
                            <option value="M">남</option>
                            <option value="W">여</option>
                        </STSelect>

                        <STNumber>
                            <STButton onClick={handleAdd}>+</STButton> {counter}<STButton onClick={handleminus}>-</STButton>
                        </STNumber><br/>
                        <StTitleBox>
                            <AllInput type="text" placeholder="제목" name="title"  defaultValue={modPost.title||""} onChange={modPostHandle} style={{width : "100%"}}/>
                        </StTitleBox>

                        {/*사진 업로드*/}
                      
                    {/*이미지 올리기*/}
                    <StCarouselWrap>
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                                    {modPost.postImgInfo.map((imgInfo, i) => {
                                        return (
                                            <Carousel.Item key={imgInfo.id}>
                                                <img style={{ height: "180px" }}
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
                            <AllTextarea type="text" name="content" defaultValue={modPost.content|| ""} onChange={modPostHandle} />
                        </StContentBox>

                        <StEventLinkBox>
                            <br/><label>카카오 링크</label><br/>
                            <AllInput type="text" name="kakaoLink" defaultValue={modPost.kakaoLink} onChange={modPostHandle} style={{width : "100%"}}/>
                        </StEventLinkBox>
                        
                        <StEventLinkBox>
                            <br/><label>행사장 링크</label><br/>
                            <AllInput type="text" name="postLink" defaultValue={modPost.postLink} onChange={modPostHandle} style={{width : "100%"}}/>
                        </StEventLinkBox>
                        <br/>

                        <div>
                            <StEventPlaceBox>
                                    <div>행사장소<button onClick={popupPostCode}> 주소 검색하기</button></div>
                                        
                                    {isPopupOpen && (
                                        <ModalWrap>
                                            <SearchAddress setPostAddres={setPostAddress} popupPostCode={popupPostCode} />
                                        </ModalWrap>
                                    )}
                                    <div className='address-box'>
                                        <div className='tag'>#{modPost.postAddress.split(' ')[0]}</div>
                                        <div className='address'>{modPost.postAddress}</div>
                                    </div>
                            </StEventPlaceBox><br/>
                            <input type="text" placeholder='상세주소' name="detailAddress" onChange={modPostHandle}/>
                            <KakaoMap address={modPost.postAddress} width='100%' height='130px' />                                                            
                        </div><br/>

                        <div>
                            <button onClick={onSubmitGather}>수정완료</button>
                            <button onClick={toggleEdit}>취소</button>
                        </div>
                    </div>
                    
                )
                : 
                (
                    <div>
                        <div>
                            <button>모집글</button>
                            <button>{post.category}</button>
                            <button>{post.date}</button>
                            <button>{post.number}</button>
                            {/* <button>연락수단</button> */}
                            <button>{sex}</button>
                            <button>{post.startAge}~{post.endAge}</button>
                        </div>
                    <StTitleBox><input type="text" name="title" value={post.title||""} readOnly/></StTitleBox>
                    <br/>

                    <Carousel fade>
                        {
                            post.postImgInfo
                            &&post.postImgInfo.map((img,i) => {
                                return (
                                    <Carousel.Item key={img.id+i}>            
                                        <img style={{width:'400px'}} 
                                        src={img.postImgUrl} />  
                                    </Carousel.Item>)
                            })
                        }
                    </Carousel>

                    <StContentBox><input type="text" name="content" value={post.content||""} readOnly/></StContentBox>
                  
                    <StEventLinkBox>
                        <div>카카오 링크</div>
                        <input type="text" name="kakaoLink" value={post.kakaoLink|| ""}  readOnly/>
                    </StEventLinkBox>
                    
                    <StEventLinkBox>
                        <div>행사장 링크</div>
                        <input type="text" name="postLink" value={post.postLink || ""}  readOnly/>
                    </StEventLinkBox>
                    
                    <StEventPlaceBox>
                        <div>행사장소</div>
                        <div className='address-box'>
                            <div className='tag'>#{post.postAddress.split(' ')[0]}</div>
                            <div className='address'>{post.postAddress}</div>

                        </div>
                    </StEventPlaceBox>
                    <KakaoMap address={post.postAddress} width='100%' height='200px' />

                    <StButtonBox>
                        {localStorage.getItem('userId') === post.userId.toString() && 
                                (<div>
                                <button onClick={toggleEdit}>수정</button>
                                    <button onClick={()=> {onGatherDelete(postId); }}>삭제</button>
                                </div>)}
                    </StButtonBox>
                </div>
                )
            }
            
           
            {/* <Comment /> */}

        </StWrap>
    );
};

export default Gather;

const STSelect = styled.select`
    font-size: 14px;
    background-color: #F4F4F4;
    /* width : 48%; */
    border-radius: 10px;
    border : transparent;
    padding:5px;
    height : 32px;
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
    background-color: #F4F4F4;
`
const STNumber = styled.div`
    border-radius: 8px;
    background-color: #F4F4F4;
    font-size: 14px;
    float: right;
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