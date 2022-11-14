import React, {useState, useRef} from 'react';
import { useDispatch} from 'react-redux';
import {__addPost2} from "../../redux/modules/PostSlice2"
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
//kakao 주소 관련
import SearchAddress from './SearchAddress';
import PopupDom from './PopupDom';
import KakaoMap from '../../components/common/KakaoMap'
//부트스트랩
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';


const GatherPost =() => {
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
            setCounter(counter+1);
        }

        const handleminus = (e)=> {
            setCounter(counter-1)
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
            category :"",
            date : "",
            kakaoLink:"",
            //sex:"",
            startAge:"",
            endAge:"",
            title:"",
            content:"",
            postLink:"",
            postAddress:"",
            detailAddress:""
        })

        const onChangeHandler2 =(e) => {
            const {value, name} = e.target;
            setGatherPosts({
                ...gatherPosts,
                [name] : value
            })
        }

        const onSubmit2 = () => {

            const formData = new FormData();

            if (imgFile.length > 0) {
                imgFile.forEach((file) => {
                  formData.append("multipartFile", file);
                })
              } else {
                formData.append("multipartFile", null);
              }
            
            const obj2 = {
                category : gatherPosts.category,
                date : gatherPosts.date,
                number : counter,
                kakaoLink : gatherPosts.kakaoLink,
                sex : sexValue,
                startAge : gatherPosts.startAge,
                endAge : gatherPosts.endAge,
                title : gatherPosts.title,
                content : gatherPosts.content,
                postLink : gatherPosts.postLink,
                postAddress : postAddress+gatherPosts.detailAddress,
            }

            formData.append("gatherPostDto", new Blob([JSON.stringify(obj2)], { type: "application/json" }));
            dispatch(__addPost2(formData));
        }
    
       
    // 주소 API 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
    const popupPostCode = () => {
        setIsPopupOpen(!isPopupOpen)
    }

    //날짜 제한
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear()

    const today2= year + '-' + month + '-' + day;

    return (
        <>
            <label>모집인원</label>
                <button onClick={handleAdd}>+</button>{counter>=0? counter : alert("인원을 입력해주세요")}<button onClick={handleminus}>-</button>
                    <Form.Select aria-label="Default select example" style={{width :"250px"}} name="category" onChange={onChangeHandler2}>
                        <option>카테고리</option>
                        <option value="마라톤">마라톤</option>
                        <option value="페스티벌">페스티벌</option>
                        <option value="전시회">전시회</option>
                        <option value="공연">공연</option>
                        <option value="기타">기타</option>
                    </Form.Select>

                <ButtonGroup className="mb-2">
                    {sexs.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={sexValue === radio.value}
                            onChange={(e) => setSexValue(e.currentTarget.value)}>
                                {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>

                {/* <input type="date" name="date" onChange={onChangeHandler2} min={today2}/><br/> */}
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>행사시작</Form.Label>
                    <Form.Control type="date"  name="date" onChange={onChangeHandler2} min={today2} style={{width:'200px'}}/>
                    </Form.Group>
                </Row>
                <div>
                    <input type="text" placeholder='나이' name="startAge" style={{width: "60px"}} onChange={onChangeHandler2}/> ~ 
                    <input type="text" placeholder='나이' name="endAge" style={{width: "60px"}} onChange={onChangeHandler2}/>
                </div>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>글 작성</Form.Label>
                    <Form.Control type="text" placeholder="제목" name="title" onChange={onChangeHandler2}/>
                </Form.Group>
                {/* <div>
                    <label>글 작성</label><br/>
                    <input type="text" placeholder="제목" name="title" onChange={onChangeHandler2}/>
                </div>*/}
                <div><br/>
                    <button onClick={()=> { imgRef.current.click()}}> 업로드 버튼</button><br/>
                        <label htmlFor="imgFile">
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="imgFile"
                                onChange={onChangeImage}
                                accept="image/*"
                                ref={imgRef}
                                name="imgFile"
                                multiple/>
                     
                        <Carousel>
                            {
                                imgUrl.map((img) => {
                                    return (
                                        <Carousel.Item key={img.id}>            
                                            <img style={{width:'550px'}} src={img ? img : ""} />  
                                        </Carousel.Item>
                                    )})
                            }
                        </Carousel> 
                       
                            </label>
                </div >

                <Form.Control  type="text" placeholder="소개글" name="content" onChange={onChangeHandler2} style={{height : '200px'}}/>
                {/* <input type="text" placeholder="소개글" name="content" onChange={onChangeHandler2}/> */}
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>카카오 링크</Form.Label>
                        <Form.Control type="text" placeholder="링크" name="kakaoLink" onChange={onChangeHandler2}/>
                    </Form.Group>
                        {/* <div>
                            <label>카카오 링크</label>
                            <input type="text" placeholder="링크" name="kakaoLink" onChange={onChangeHandler2}/>
                        </div> */}
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>행사장 링크</Form.Label>
                        <Form.Control type="text" placeholder="링크" name="postLink" onChange={onChangeHandler2}/>
                    </Form.Group>
                        {/* <div>
                            <label>행사장 링크</label>
                            <input type="text" placeholder="링크" name="postLink" onChange={onChangeHandler2}/>
                        </div> */}
                <div>
                    <input type="text" value={postAddress} placeholder='우편번호 검색을 클릭해주세요' style={{width: "70%"}}/>
                    <button type='button' onClick={popupPostCode}>우편번호 검색</button><br/>
                    {/* {postAddress} */}
                    <input type="text" name="detailAddress" placeholder='상세주소' onChange={onChangeHandler2} style={{width: "70%"}}/>
                    <div id='popupDom'>
                        {isPopupOpen && (
                            <PopupDom>
                                <SearchAddress onClose={popupPostCode} setPostAddres={setPostAddress}/>  
                            </PopupDom>)}
                    </div>    
                        {
                            postAddress !== ""&&<KakaoMap address={postAddress} width="500px" height="300px"/>
                        }                      
                 </div><br/>
                <button onClick={onSubmit2}>등록하기</button>
                <button onClick={()=>navigate(-1)}>취소</button>
        </>
    )
}

export default GatherPost;

