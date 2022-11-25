import React, { useState, useEffect, useRef } from 'react';
import Layout from '../layout/Layout';
import SearchAddress from './SearchAddress';
import KakaoMap from '../common/KakaoMap'
import { useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';
import { __addPost3 } from "../../redux/modules/postSlice3"
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi'
import noImg from '../../assets/images/common/noImg.png'

const QuestionPost = () => {


    const dispatch = useDispatch();

    // 주소 API 팝업창 상태 관리
    const [postAddress, setPostAddress] = useState("")
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const popupPostCode = () => {
        setIsPopupOpen(!isPopupOpen)
    }

    //내용 onChange
    const [question, setQuestion] = useState({
        title: "",
        content: "",
        postLink: "",
        detailAddress: ""
    })

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setQuestion({
            ...question,
            [name]: value
        })
    }

    //1.이미지 업로드 부분
    const [imgFile, setImgFile] = useState([]);
    const [imgUrl, setImgUrl] = useState([]);
    const imgRef = useRef();

    const onChangeImage = (e) => {
        const files = e.currentTarget.files;

        setImgFile([])
        setImgUrl([])

        if ([...files].length > 5) {
            alert('이미지는 최대 3개까지 업로드가 가능합니다.');
            return;
        }

        //선택한 이미지 파일 반복문 돌리기
        [...files].forEach(file => {

            //이미지 압축 지정 
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1000,
                useWebWorker: true,
            };

            //압축 관련 내용
            imageCompression(file, options)
                .then((res) => {

                    //이미지를 담기 : type에서 "image/*"을 하면 나오지 X split을 이용
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

    const onSubmit = () => {

        // //모집인원, 카테고리, 성비관련, 행사시작, 연령대, 제목, 내용, 카카오링크
        if (question.title === "") { return (alert('제목을 입력하세요')) }
        if (question.content === "") { return (alert('내용을 입력하세요')) }

        //행사장 링크(필수 아님)
        const arr = question.postLink.indexOf("http://" || "https://") !== -1
        if (question.postLink !== "") {
            if (arr === false) {
                return (alert('http:// 또는 https://가 포함된 링크를 입력해주세요'))
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

        const obj3 = {
            title: question.title,
            content: question.content,
            postLink: question.postLink,
            postAddress: postAddress + question.detailAddress,
        }

        formData.append(
            "askPostRequestDto",
            new Blob([JSON.stringify(obj3)], { type: "application/json" })
        );
        dispatch(__addPost3(formData));
    }

    //주소 앞에 두글자 따기
    const region = postAddress.split("")[0] + postAddress.split("")[1]

    return (
        <>
            {isPopupOpen && (
                <ModalWrap onClick={popupPostCode}>
                    <SearchAddress setPostAddres={setPostAddress} popupPostCode={popupPostCode} />
                </ModalWrap>
            )}

            <Layout>
                <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    <h4 style={{ textAlign: "center", marginTop: "18px", marginBottom: "18px" }}>질문글</h4>

                    <STInput type="text" placeholder="제목" name="title" onChange={onChangeHandler}
                        style={{ width: "100%", marginBottom: "18px" }} />

                    {imgUrl.length === 0 && <img src={noImg} style={{ width: "100%" }} onClick={() => { imgRef.current.click() }} />}
                    <div>
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

                        </label>
                    </div >

                    <Carousel>
                        {imgUrl && imgUrl.map((img, index) => {
                            return (
                                <Carousel.Item key={img.id}>
                                    <button style={{ width: "100%" }}>
                                        <img src={img} style={{ width: '396px', height: "396px", objectFit: "contain" }} onClick={() => { imgRef.current.click() }} />
                                    </button>
                                </Carousel.Item>
                            )
                        })
                        }
                    </Carousel>

                    <AllTextarea type="text" placeholder="소개글" name="content" onChange={onChangeHandler} style={{ width: "100%", height: "200px" }} />

                    <div style={{ marginBottom: "14px" }}>
                        <label>행사장 링크</label>
                        <STInput type="text" placeholder="링크" name="postLink" onChange={onChangeHandler} style={{ width: "100%" }} />
                    </div>


                </div>

                {/*주소 부분 */}
                <div style={{ marginLeft: "10px" }}>
                    <StSearchBox onClick={popupPostCode} style={{ background: "#E1E3EC" }}>
                        <button style={{ color: "#8B909F" }}><FiSearch style={{ width: '20px', height: '20px', color: '#424754', marginLeft: "10px", marginRight: "10px" }} />주소검색</button>
                    </StSearchBox>

                    <AddressBox >
                        {
                            postAddress !== "" && (
                                <div>
                                    <div style={{ display: "flex", marginBottom: "10px" }}>
                                        <STAddressButton style={{ marginRight: "10px", flex: "2" }}>{"#" + region}</STAddressButton>
                                        <STInput3 type="text" defaultvalue={postAddress} placeholder='우편번호 검색을 클릭해주세요' style={{ flex: "8" }}>{postAddress}</STInput3>
                                    </div>
                                    <STInput type="text" name="detailAddress" placeholder='상세주소' onChange={onChangeHandler} style={{ width: "80%", float: "right" }} />
                                    <KakaoMap address={postAddress} width="328px" height="300px" />

                                </div>)
                        }
                    </AddressBox >
                </div>

                <div>
                    <AllButton style={{ background: "#3556E1", color: "white" }} onClick={onSubmit}>작성</AllButton>
                </div>
            </Layout>

        </>
    )
}

export default QuestionPost;


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
    background-color: white;
    /* float : right; */
`
const AllButton = styled.button`
    width : 100%;
    height: 48px;
    border: transparent;
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
    padding-left: 10px;
    padding-top: 10px;
`

const ModalWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 0 15px;
  box-sizing: border-box;
`;
//------------------------------------

// const STInput = styled.input`
//     width: 100%;
//     height: 36px;
//     background: white;
//     border-radius: 10px;
//     font-weight: 500;
//     padding-top: 6px;
//     padding-left: 6px;
//     padding-bottom: 6px;
//     border:transparent;
// `
const StCarouselWrap = styled.div`
    .carousel-indicators [data-bs-target]{
        width:3px;
        border-radius : 50%;
    }
`
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