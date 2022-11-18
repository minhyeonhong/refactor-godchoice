import React, { useState,  useRef } from 'react';
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
import { useDispatch } from 'react-redux';
import SearchAddress from '../post/SearchAddress';

const Gather = ({post}) => {

    const dispatch = useDispatch();
  
    //수정하기
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => {setEdit(!edit);};

    //input onChange
    const [gatherPosts, setGatherPosts] = useState({
        category :post.category,
        date : post.date,
        kakaoLink: post.kakaoLink,
        sex: post.sex,
        startAge: post.startAge,
        endAge: post.endAge,
        title: post.title,
        content: post.content,
        postLink: post.postLink,
        detailAddress: ""
    })

    const onChangeGather =(e) => {
        const {value, name} = e.target;
        setGatherPosts({
            ...gatherPosts,
            [name] : value
        })
    }

//이미지 부분 놔두기!
const [imgFile, setImgFile] = useState([]);
const [imgUrl, setImgUrl] = useState([]);
const imgRef = useRef();

// const onChangeImage = (e) => {
//     const files = e.currentTarget.files;

//     if ([...files].length > 5) {
//       alert('이미지는 최대 5개까지 업로드가 가능합니다.');
//       return;
//     }

//     //선택한 이미지 파일 반복문 돌리기
//     [...files].forEach(file => {

//       //이미지 압축 지정 
//       const options = {
//         maxSizeMB: 0.5,
//         maxWidthOrHeight: 220,
//         useWebWorker: true,
//       };

//       //압축 관련 내용
//       imageCompression(file, options)
//         .then((res) => {

//           setImgFile(imgs => [...imgs, new File([res], res.name, { type: "image/" + res.name.split(".")[1] })]);
//           const reader = new FileReader(); 

//           reader.onload = () => {
//             setImgUrl(imgUrl => [...imgUrl, reader.result]);
//           };
//           reader.readAsDataURL(res); 
//         })
//         .catch((error) => {
//           console.log("파일 압축 실패", error);
//         })
//     });
//  }
    const onSubmitHandler = () => {

        //모집인원, 카테고리, 성비관련, 행사시작, 연령대, 제목, 내용, 카카오링크
        if(counter<1){return (alert('모집인원을 입력하세요'))}
        if(gatherPosts.category===""){return (alert('카테고리를 입력하세요'))}
        if(gatherPosts.sex===""){return (alert('성비를 선택하세요'))}
        if(gatherPosts.startAge===""||gatherPosts.endAge===""){return (alert('연령대를 입력하세요'))}
        if(gatherPosts.title===""){return (alert('제목을 입력하세요'))}
        if(gatherPosts.content===""){return (alert('내용을 입력하세요'))}
        if(gatherPosts.date===""){return (alert('행사시작 일자를 입력하세요'))}
        if(gatherPosts.kakaoLink===""){return (alert('연락할 카카오 링크를 입력하세요'))}

        //링크 검사(행사장링크 필수 아님)
        const arr = gatherPosts.postLink.indexOf("http://"||"https://") !==-1
        if(gatherPosts.postLink!==""){
            if(arr===false){
                return(alert('http:// 또는 https://가 포함된 링크를 입력해주세요'))
            }
        }

        const formData = new FormData();

        if (imgFile.length > 0) {
            imgFile.forEach((file) => {
            formData.append("multipartFile", file);
            })
        } else {
            formData.append("multipartFile", null);
        }

        formData.append("category", gatherPosts.category)
        
        const obj = {
            date : gatherPosts.date,
            number : counter,
            kakaoLink : gatherPosts.kakaoLink,
            sex :  gatherPosts.sex,
            startAge : gatherPosts.startAge,
            endAge : gatherPosts.endAge,
            title : gatherPosts.title,
            content : gatherPosts.content,
            postLink : gatherPosts.postLink,
            postAddress : postAddress+gatherPosts.detailAddress
        }
        console.log(obj)
        formData.append("gatherPostDto", new Blob([JSON.stringify(obj)], { type: "application/json" }));
        // dispatch(__editPost(formData));
        toggleEdit()
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
    const [counter, setCounter] = useState(Number(post.number));
    const handleAdd = () => {setCounter(counter+1);}

    const handleminus = ()=> {
        if(counter>0){
            setCounter(counter-1)
        }
    }

    // 주소 API 팝업창 상태 관리& useState
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const popupPostCode = () => {setIsPopupOpen(!isPopupOpen)}
    const [postAddress, setPostAddress] = useState(post.postAddress)

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

                        <STSelect name="category" defaultValue={post.category||""} onChange={onChangeGather}>
                            <option value="마라톤">마라톤</option>
                            <option value="페스티벌">페스티벌</option>
                            <option value="전시회">전시회</option>
                            <option value="공연">공연</option>
                            <option value="기타">기타</option>
                        </STSelect>

                        <AllInput type="date" name="date" defaultValue={post.date||""} onChange={onChangeGather} min={today2} />
                        <AllInput type="text" defaultValue={post.startAge} name="startAge" onChange={onChangeGather} /> ~ {''}
                        <AllInput type="text" defaultValue={post.endAge} name="endAge" onChange={onChangeGather} />
                        
                        <STSelect name="category" defaultValue={post.sex} onChange={onChangeGather}>
                            <option value="NF">성비무관</option>
                            <option value="M">남</option>
                            <option value="W">여</option>
                        </STSelect>

                        <STNumber>
                            <STButton onClick={handleAdd}>+</STButton> {counter}<STButton onClick={handleminus}>-</STButton>
                        </STNumber><br/>
                        <StTitleBox>
                            <AllInput type="text" placeholder="제목" name="title"  defaultValue={post.title||""} onChange={onChangeGather} style={{width : "100%"}}/>
                        </StTitleBox>

                        {/*사진 업로드*/}
                        <div>
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
                        </div>
                        
                        <StContentBox>
                            <AllTextarea type="text" name="content" defaultValue={post.content|| ""} onChange={onChangeGather} />
                        </StContentBox>

                        <StEventLinkBox>
                            <br/><label>카카오 링크</label><br/>
                            <AllInput type="text" name="kakaoLink" defaultValue={post.kakaoLink} onChange={onChangeGather} style={{width : "100%"}}/>
                        </StEventLinkBox>
                        
                        <StEventLinkBox>
                            <br/><label>행사장 링크</label><br/>
                            <AllInput type="text" name="postLink" defaultValue={post.postLink} onChange={onChangeGather} style={{width : "100%"}}/>
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
                                        <div className='tag'>#{postAddress&&postAddress.split(' ')[0]}</div>
                                        <div className='address'>{postAddress}</div>
                                    </div>
                            </StEventPlaceBox><br/>
                            <input type="text" placeholder='상세주소' name="detailAddress" onChange={onChangeGather}/>
                            <KakaoMap address={postAddress} width='100%' height='130px' />                                                            
                        </div><br/>

                        <div>
                            <button onClick={onSubmitHandler}>수정완료</button>
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
                        <button onClick={toggleEdit}>수정</button>
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
