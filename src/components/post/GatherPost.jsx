import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { __addPost2 } from "../../redux/modules/PostSlice2"
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { FiSearch } from 'react-icons/fi'
//kakao 주소 관련
import SearchAddress from './SearchAddress';
import KakaoMap from '../../components/common/KakaoMap'
//부트스트랩
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { STNumber, STButton, STSelectButton, AllButton, AllInput, StSearchBox, RegionButton, AddressBox, AddressInput, ModalWrap } from '../styles/GatherDetail.styled'
import Layout from '../layout/Layout'
import noImg from '../../assets/images/common/noImg.png'


const GatherPost = () => {
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

    //2-2 게시글 작성 - 모집글

    //모집인원
    const [counter, setCounter] = useState(0);

    const handleAdd = (e) => {
        setCounter(counter + 1);
    }

    const handleminus = (e) => {
        if (counter > 0) {
            setCounter(counter - 1)
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
    const [gatherPosts, setGatherPosts] = useState({
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

    const onChangeHandler2 = (e) => {
        const { value, name } = e.target;
        setGatherPosts({
            ...gatherPosts,
            [name]: value
        })
    }

    const onSubmit2 = () => {

        // //모집인원, 카테고리, 성비관련, 행사시작, 연령대, 제목, 내용, 카카오링크
        if (counter < 1) { return (alert('모집인원을 입력하세요')) }
        if (gatherPosts.category === "") { return (alert('카테고리를 입력하세요')) }
        if (sexValue === "") { return (alert('성비를 선택하세요')) }
        if (gatherPosts.startAge === "" || gatherPosts.endAge === "") { return (alert('연령대를 입력하세요')) }
        if (gatherPosts.title === "") { return (alert('제목을 입력하세요')) }
        if (gatherPosts.content === "") { return (alert('내용을 입력하세요')) }
        if (gatherPosts.date === "") { return (alert('행사시작 일자를 입력하세요')) }
        if (gatherPosts.kakaoLink === "") { return (alert('연락할 카카오 링크를 입력하세요')) }
        if (postAddress === "") { return (alert('함께 만날 주소를 입력해주세요')) }
        // //링크 검사(행사장링크 필수 아님)
        const arr = gatherPosts.postLink.indexOf("http://" || "https://") !== -1
        if (gatherPosts.postLink !== "") {
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

        const obj2 = {

            category: gatherPosts.category,
            date: gatherPosts.date,
            number: counter,
            kakaoLink: gatherPosts.kakaoLink,
            sex: sexValue,
            startAge: gatherPosts.startAge,
            endAge: gatherPosts.endAge,
            title: gatherPosts.title,
            content: gatherPosts.content,
            postLink: gatherPosts.postLink,
            postAddress: postAddress + gatherPosts.detailAddress,
        }
        // console.log(obj2)
        formData.append("gatherPostDto", new Blob([JSON.stringify(obj2)], { type: "application/json" }));
        dispatch(__addPost2(formData));
        window.location.replace('/')
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
            {isPopupOpen && (
                <ModalWrap onClick={popupPostCode}>
                    <SearchAddress setPostAddres={setPostAddress} popupPostCode={popupPostCode} />
                </ModalWrap>
            )}
            <Layout style={{ height: "100%" }}>
                <div style={{ paddingLeft: "10px", paddingRight: "10px", height: "100%" }}>
                    <h4 style={{ textAlign: "center", marginTop: "18px", marginBottom: "18px" }}>모집글</h4>


                    <div style={{ marginBottom: "14px" }}>
                        <STInput type="text" placeholder="제목" name="title" onChange={onChangeHandler2} style={{ width: "100%" }} />
                    </div>

                    {imgUrl.length === 0 && <img src={noImg} style={{ width: "100%" }} onClick={() => { imgRef.current.click() }} />}

                    <div >
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

                            <Carousel>
                                {
                                    imgUrl && imgUrl.map((img) => {
                                        return (
                                            <Carousel.Item key={img.id}>
                                                <img style={{ width: '100%', height: "396px", objectFit: "contain" }} onClick={() => { imgRef.current.click() }} src={img} />
                                            </Carousel.Item>
                                        )
                                    })
                                }
                            </Carousel>
                        </label>
                    </div >

                    <AllTextarea type="text" placeholder="소개글" name="content" onChange={onChangeHandler2} style={{}} />

                    <div style={{ display: "flex", marginBottom: "14px", gap: "10px" }}>
                        <STSelect name="category" onChange={onChangeHandler2} style={{ flex: "0.9", textAlign: "center" }} >
                            <option>카테고리</option>
                            <option value="마라톤">마라톤</option>
                            <option value="페스티벌">페스티벌</option>
                            <option value="전시회">전시회</option>
                            <option value="공연">공연</option>
                            <option value="기타">기타</option>
                        </STSelect>
                        <STDiv style={{ flex: "1", textAlign: "center", display: "flex" }}>
                            <STButton style={{ flex: "0.7" }} onClick={handleAdd}>+</STButton>
                            <div style={{ flex: "2", lineHeight: "40px" }}>{counter === 0 ? "모집인원" : counter}</div>
                            <STButton style={{ flex: "0.7", right: "0px" }} onClick={handleminus}>-</STButton>
                        </STDiv>
                    </div>

                    <label style={{ marginLeft: "3px" }}>연령대</label><br />
                    <div style={{ flex: "1", display: "flex", marginTop: "5px" }}>
                        <STInput2 type="text" placeholder='나이' style={{ width: "50%", textAlign: "center" }} name="startAge" onChange={onChangeHandler2} />
                        <p style={{ paddingTop: "5px" }}>~</p>
                        <STInput2 type="text" placeholder='나이' style={{ width: "50%", textAlign: "center" }} name="endAge" onChange={onChangeHandler2} />
                    </div>

                    <div style={{ display: "flex", marginTop: "10px", marginLeft: "3px" }}>
                        <div style={{ flex: "1" }}>만날 날짜</div>
                        <div style={{ flex: "1" }}>성비관련</div>
                    </div>

                    <div style={{ display: "flex", marginTop: "5px" }}>
                        <STInput2 type="date" name="date" onChange={onChangeHandler2} min={today2} style={{ flex: "0.8", textAlign: "center" }} />
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
                        <STInput type="text" placeholder="링크" name="kakaoLink" onChange={onChangeHandler2} style={{ width: "100%" }} />
                    </div>

                    <div style={{ marginBottom: "14px" }}>
                        <label>행사장 링크</label><br />
                        <STInput type="text" placeholder="링크" name="postLink" onChange={onChangeHandler2} style={{ width: "100%" }} />
                    </div>

                </div>
                <div>
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
                                    <STInput type="text" name="detailAddress" placeholder='상세주소' onChange={onChangeHandler2} style={{ width: "80%", marginBottom: "10px", float: "right" }} />
                                    <KakaoMap address={postAddress} width="328px" height="300px" />
                                </>)
                        }
                    </AddressBox >
                </div>

                <div>
                    <AllButton style={{ background: "#3556E1", color: "white" }} onClick={onSubmit2}>등록하기</AllButton>
                </div>
            </Layout>

        </>
    )
}

export default GatherPost;

const STSelectButton2 = styled(ToggleButton)`
    background-color: white;
    border : transparent;
    height : 40px;
    color: black;
    font-size: 14px;
    border-radius: 10px;
    padding-top: 10px;
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
const AllTextarea = styled.textarea`
    border-radius: 10px;
    border: transparent;
    width : 100%;
     height: 200px;
    margin-bottom:14px;
    padding-left: 10px;
    padding-top: 10px;
`
const STSelect = styled.select`
    height : 40px;
    font-size: 14px;
    background-color: #FFF;
    border-radius: 10px;
    padding:12px 16px;
    border: transparent;
    /* flex : 1; */
`

const STDiv = styled.div`
    height : 40px;
    font-size: 14px;
    background-color: #FFF;
    border-radius: 10px;
    /* padding:12px 16px; */
    border: transparent;
    position: relative;
    /* line-height: 40px; */
    /* flex : 1; */
`

const STInput2 = styled.input`
    height : 40px;
    font-size: 14px;
    background-color: #FFF;
    border-radius: 10px;
    padding:12px 16px;
    border: transparent;
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
