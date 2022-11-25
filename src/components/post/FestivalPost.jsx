import React, { useState, useRef } from 'react';
import { __addPost, __addAdminPost } from '../../redux/modules/postSlice';
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi'
import pictureAdd from '../../assets/pictureAdd.png'
//kakao 주소 관련
import SearchAddress from './SearchAddress';
import KakaoMap from '../../components/common/KakaoMap'
//부트스트랩
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Layout from '../layout/Layout'
import { useEffect } from 'react';
import noImg from '../../assets/images/common/noImg.png'
import { ModalWrap } from '../styles/GatherDetail.styled';

const FestivalPost = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    //주소 API useState
    const [postAddress, setPostAddress] = useState("")

    //1.이미지 업로드 부분
    const [imgFile, setImgFile] = useState([]);
    const [imgUrl, setImgUrl] = useState([]);
    const imgRef = useRef();

    const onChangeImage = (e) => {
        const files = e.currentTarget.files;

        if ([...files].length > 5) {
            alert('이미지는 최대 5개까지 업로드가 가능합니다.');
            return;
        }

        //선택한 이미지 파일 반복문 돌리기
        [...files].forEach(file => {

            //이미지 압축 지정 
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 220,
                useWebWorker: true,
            };

            //압축 관련 내용
            imageCompression(file, options)
                .then((res) => {

                    setImgFile(imgs => [...imgs, new File([res], res.name, { type: "image/" + res.name.split(".")[1] })]);
                    const reader = new FileReader();

                    reader.onload = () => {
                        setImgUrl(imgUrl => [...imgUrl, reader.result]);
                    };
                    reader.readAsDataURL(res);
                })
                .catch((error) => {
                    console.log("파일 압축 실패", error);
                })
        });
    }


    //2-1 게시글 작성 - 행사글

    const [festival, setFestival] = useState({
        category: "",
        startPeriod: "",
        endPeriod: "",
        title: "",
        content: "",
        postLink: "",
        detailAddress: "" //상세 주소를 보내주기 위함
    })

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setFestival({
            ...festival,
            [name]: value
        })
    }


    const onSubmit = () => {




        const formData = new FormData();

        if (imgFile.length > 0) {
            imgFile.forEach((file) => {
                formData.append("multipartFile", file);
            })
            // formData.append("multipartFile", imgFile)
        } else {
            formData.append("multipartFile", null);
        }

        const obj = {
            category: festival.category,
            startPeriod: festival.startPeriod,
            endPeriod: festival.endPeriod,
            title: festival.title,
            content: festival.content,

            postAddress: postAddress + festival.detailAddress, //상세 주소 내용 추가
            postLink: festival.postLink,
        }


        const adminObj = {
            title: festival.title,
            postLink: festival.postLink,
        }


        if (isAdmin) {
            formData.append("adminPostReqDto", new Blob([JSON.stringify(adminObj)], { type: "application/json" }));
            dispatch(__addAdminPost(formData));
        } else {
            //카테고리, 행사시작, 행사마감, 글작성, content 검사
            if (festival.category === "") { return (alert('카테고리를 입력하세요')) }
            if (festival.startPeriod === "") { return (alert('행사시작 일자를 입력하세요')) }
            if (festival.endPeriod === "") { return (alert('행사마감 일자를 입력하세요')) }
            if (festival.title === "") { return (alert('제목을 입력하세요')) }
            if (festival.content === "") { return (alert('내용을 입력하세요')) }

            //링크 검사
            const arr = festival.postLink.indexOf("http://" || "https://") !== -1
            if (festival.postLink !== "") {
                if (arr === false) {
                    return (alert('http:// 또는 https://가 포함된 링크를 입력해주세요'))
                }
            }
            console.log("obj", obj)
            formData.append("eventPostReqDto", new Blob([JSON.stringify(obj)], { type: "application/json" }));
            dispatch(__addPost(formData));
        }


        //  window.location.replace("/")
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
    const today3 = festival.startPeriod

    //주소 앞에 두글자 따기
    const region = postAddress.split("")[0] + postAddress.split("")[1]


    const [isAdmin, setIsAdmin] = useState(false);
    const adminPostHandle = (e) => {
        if (e.target.checked) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }

    useEffect(() => {
        console.log("isAdmin", isAdmin);
    }, [isAdmin])



    return (
        <>
        {isPopupOpen && (
                <ModalWrap onClick={popupPostCode}>
                    <SearchAddress setPostAddres={setPostAddress} popupPostCode={popupPostCode} />
                </ModalWrap>
            )}
        <Layout style={{height:"100%"}} >
            <FestivalWrap>
                        {/* <STSelect value="행사글" style={{ width: "50%" }} disabled>
                            <option value="행사글">행사글</option>
                        </STSelect> */}
                        <h4 style={{ textAlign: "center", marginTop: "8px", marginBottom: "18px" }}>행사글</h4>


                <Form.Group className="mb-3" controlId="formGridAddress1" style={{height:"auto"}}>
                    <Form.Control type="text" placeholder="제목" name="title" onChange={onChangeHandler} style={{ width: "100%", height: "48px", border: "none", margin: "0 0 10px 0" }} />
                </Form.Group>

  {imgUrl.length === 0 && <img src={noImg} style={{ width: "100%", marginBottom: "14px" }} onClick={() => { imgRef.current.click() }} />}
                
                <div >
              
                {/* <div style={{position:"absolute"}} > */}
                    <label htmlFor="imgFile">
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="imgFile"
                            onChange={onChangeImage}
                            accept="image/*"
                            ref={imgRef}
                            name="imgFile"
                            multiple />

                    {/* </label>
                </div > */}

                <Carousel>
                    {imgUrl && imgUrl.map((img, index) => {
                        return (
                            <Carousel.Item key={img.id}>
                                    <img src={img} style={{ width: '100%', height: "396px", objectFit: "contain" }} onClick={() => { imgRef.current.click() }} />

                            </Carousel.Item>
                        )
                    })
                    }
                </Carousel>
                            
                    </label>
                </div >

                <AllTextarea type="text" placeholder="행사글을 띄어쓰기 포함 2500자 이내로 입력해주세요" name="content" onChange={onChangeHandler} maxLength={2500} style={{ height: '200px', width: "100%", border: "none", padding: "10px", margin:"0", marginBottom:"14px" }} />

                <STSelect style={{ width: "100%", marginBottom:"10px", padding: "10px" }} name="category" onChange={onChangeHandler}>
                            <option>카테고리</option>
                            <option value="마라톤">마라톤</option>
                            <option value="페스티벌">페스티벌</option>
                            <option value="전시회">전시회</option>
                            <option value="공연">공연</option>
                            <option value="기타">기타</option>
                        </STSelect>

                <SelBottom>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>행사시작</Form.Label>
                                <Form.Control type="date" name="startPeriod" onChange={onChangeHandler} min={today2} className="dateform"
                                />
                            </Form.Group>
                            {/* <span>~</span> */}
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>행사마감</Form.Label>
                                <Form.Control type="date" name="endPeriod" onChange={onChangeHandler} min={today3} className="dateform" />
                            </Form.Group>
                        </Row>
                    </SelBottom>
                    {/* SelBottom */}


                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>행사장 링크</Form.Label>
                    <Form.Control type="text" placeholder="링크" name="postLink" onChange={onChangeHandler}  style={{ width: "100%", height: "48px", border: "none", margin: "0 0 10px 0" }} />
                </Form.Group>

                {/* 주소 부분 */}
                <div>
                    <StSearchBox style={{ background: "#E1E3EC", height: "40px" }} onClick={popupPostCode}>
                        <button style={{ color: "#8B909F" }}><FiSearch style={{ width: '20px', height: '40px', color: '#424754',  marginRight: "10px" }} />주소검색</button>
                    </StSearchBox>

                   

<AddressBox >
                        {
                            postAddress !== "" && (
                                <>
                                    <div style={{ display: "flex", marginBottom: "10px" }}>
                                        <STAddressButton style={{ marginRight: "10px", flex: "2" }}>{"#" + region}</STAddressButton>
                                        <STInput3 type="text" value={postAddress} style={{ flex: "8" }} readOnly>{postAddress}</STInput3>
                                    </div>
                                    <STInput type="text" name="detailAddress" placeholder='상세주소' onChange={onChangeHandler} style={{ width: "80%", marginBottom: "10px", float: "right" }} />
                                    <KakaoMap address={postAddress} width="328px" height="300px" />
                                </>)
                        }
                    </AddressBox >
                </div><br />
                {
                    localStorage.getItem('role') === 'ADMIN' &&
                    <div><input type='checkbox' onChange={adminPostHandle} />관리자글</div>
                }
                <AllButton style={{ background: "#3556E1", color: "white" , borderRadius:"10px" }} onClick={onSubmit}>작성</AllButton>
                {/*<AllButton onClick={()=>navigate(-1)}>취소</AllButton>  <AddressModal />*/}
            </FestivalWrap>
        </Layout>
        </>

    )
}

export default FestivalPost;

const FestivalWrap = styled.div`
    padding: 20px 10px;
`
const SelectWrap = styled.div`
width: 100%;
height: auto;

`

const SelTop = styled.div`
    display: flex;
    gap : 15px;
    margin-bottom : 10px;
`

const SelBottom = styled.div`
    .mb-3 {
    display: flex;
    justify-content : space-between;
     --bs-gutter-x : 0;
     gap : 10px;
    .dateform {
        border-radius : 10px;
        height : 48px;
        flex : 1;
        border: none;
    }


}
`

const STSelect = styled.select`
    width : 100%;
    height : 48px;
    font-size: 16px;
    background-color: #FFF;
    border-radius: 10px;
    padding:12px 16px;
    border: none;
    option {
       padding 0 10px ;
    }
`

const StSearchBox = styled.div`
    background: #EEEAE3;
    box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius : 30px;
    display : flex;
    flex-direction : row;
    margin : 10px 0;
    height : 36px;
    padding: 0 10px;
    button{
        background-color : transparent;
        border : none;
        border-radius :  30px 0 0 30px ; 
    }
`
const RegionButton = styled.button`
    border-radius: 14px;
    border: transparent;
    background-color: #D9D9D9;
`
const AddressBox = styled.div`
    margin : 20px 20px 20px 20px;
`
const AddressInput = styled.input`
    border-radius: 5px;
    margin-bottom: 5px;
    border: transparent;
    background-color: #F4F4F4;
    float : right;
`

const AllButton = styled.button`
    width : 100%;
    height: 48px;
    border: transparent;
`

const AllTextarea = styled.textarea`
border-radius: 10px;
border: 1px solid #C8C9CA;
`
const STPicture = styled.div`
    background-color: #F4F4F4;
    border-radius: 10px;
    border : transparent;
`
const Img = styled.img`
    width : 30px;
    margin: 84px;
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
//modal
// const ModalWrap = styled.div`
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.4);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 999;
//   padding: 0 15px;
//   box-sizing: border-box;
// `;

const STAddressButton = styled.div`
    width: 64px;
    height: 36px;
    background-color: #DCE0F1;
    border-radius: 30px;
    text-align: center;
    padding-top: 6px;
`
const STInput3 = styled.div`
    width: 100%;
    /* height: 36px; */
    background: white;
    border-radius: 10px;
    font-weight: 500;
    padding-top: 6px;
    padding-left: 6px;
    border : transparent;
`

const STInput = styled.input`
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

