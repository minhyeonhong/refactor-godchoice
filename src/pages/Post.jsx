import React, {useState, useEffect, useRef} from 'react';
import Layout from '../components/layout/Layout';
//import Footer from "../components/layout/Footer"
import Form from 'react-bootstrap/Form';
//import Input from '../hooks/useInput'
import SearchAddress from './SearchAddress';
import PopupDom from './PopupDom';
import { useDispatch, useSelector } from 'react-redux';
import { __addPost} from '../redux/modules/postSlice';
import {__addPost2} from "../redux/modules/PostSlice2"
import imageCompression from 'browser-image-compression';

import KakaoMap from '../components/common/KakaoMap'
import { useNavigate } from 'react-router-dom';
//남녀 성비 버튼
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';

const Post = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const posts = useSelector((state)=> state.postSlice.posts)
    //const gatherPost = useSelector((state)=> state.gatherPosts.gatherPosts)
    
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
            category : "",
            startPeriod : "",
            endPeriod : "",
            title : "",
            content : "",
            postLink : "",
            detailAddress: "" //상세 주소를 보내주기 위함
        })

        const onChangeHandler =(e) => {
            const {value, name} = e.target;
            setFestival({
                ...festival,
                [name] : value
            })
        }
    
        const onSubmit = () => {

            const formData = new FormData();

            if (imgFile.length > 0) {
                imgFile.forEach((file) => {
                  formData.append("multipartFile", file);
                })
              } else {
                formData.append("multipartFile", null);
              }
               
            const obj = {
                category : festival.category,
                startPeriod : festival.startPeriod,
                endPeriod : festival.endPeriod,
                title:festival.title,
                content:festival.content,
                postLink : festival.postLink,
                postAddress: postAddress+festival.detailAddress, //상세 주소 내용 추가
                }
                
                formData.append("eventPostReqDto", new Blob([JSON.stringify(obj)], { type: "application/json" }));
       
            dispatch(__addPost(formData));
            //window.location.replace("/postlist")
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
            postAddress:""   
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
                postAddress : postAddress,
            }

            formData.append(
                "gatherPostDto",
                new Blob([JSON.stringify(obj2)], { type: "application/json" })
                );

            dispatch(__addPost2(formData));
        }
    
       
    // 주소 API 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
    const popupPostCode = () => {
        setIsPopupOpen(!isPopupOpen)
    }

    // 모집 구분글
    const [option, setOption] = useState();

    //날짜 제한
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear()

    const today2= year + '-' + month + '-' + day;
    
    //console.log(festival.startPeriod);
    return (
        <Layout>
            <div>
                <Form.Select aria-label="Default select example" style={{width :"250px"}}
                value="option" onChange={(e)=>setOption(e.target.value)}>
                    <option>모집 구분</option>
                    <option value="글작성">행사글</option>
                    <option value="모집글">모집글</option>
                </Form.Select>
             
                {
                    option==="글작성" &&
                        (<>
                          
                            <Form.Select aria-label="Default select example" style={{width :"250px"}} name="category" onChange={onChangeHandler}>
                                <option>카테고리</option>
                                <option value="마라톤">마라톤</option>
                                <option value="페스티벌">페스티벌</option>
                                <option value="전시회">전시회</option>
                                <option value="공연">공연</option>
                                <option value="기타">기타</option>
                            </Form.Select>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>행사시작</Form.Label>
                                    <Form.Control type="date" name="startPeriod" onChange={onChangeHandler} min={today2}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>행사마감</Form.Label>
                                    <Form.Control type="date" name="endPeriod" onChange={onChangeHandler}  min={today2}/>
                                </Form.Group>
                            </Row>
                            <hr/>
                            {/* <input type="date" name="startPeriod" onChange={onChangeHandler} min={today2} data-placeholder="행사 시작"/> ~ 
                            <input type="date" name="endPeriod" onChange={onChangeHandler}  min={today2} /> */}
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>글 작성</Form.Label>
                                <Form.Control type="text" placeholder="제목" name="title" onChange={onChangeHandler} />
                            </Form.Group>
                            {/* <div>
                                <label>글 작성</label><br/>
                                <input type="text" placeholder="제목" name="title" onChange={onChangeHandler}/>
                            </div> */}

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
                                        name="imgFile"/>
                                <Carousel fade>
                                    
                                        {
                                            imgUrl.map((img) => {
                                                return (
                                                <Carousel.Item key={img.id}>            
                                                            <img src={img ? img : ""} />  
                                                </Carousel.Item>
                                                )
                                            })
                                        }
                                   
                                </Carousel>
                                </label>
                            </div >
            
                                <Form.Control  type="text" placeholder="소개글" name="content" onChange={onChangeHandler} style={{height : '200px'}}/>
                                {/* <input type="text" placeholder="소개글" name="content" onChange={onChangeHandler}/> */}
                               
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={2} style={{fontSize : "15px"}}> 행사장 링크 </Form.Label>
                                    <Col sm={1}>
                                        <Form.Control type="text" placeholder="링크" name="postLink" onChange={onChangeHandler} style={{width : '500px'}}/>
                                    </Col>
                                </Form.Group>
                            {/* <div>
                                <label>행사장 링크</label>
                                
                                <input type="text" placeholder="링크" name="postLink" onChange={onChangeHandler}/>
                            </div> */}
                            
                            <div>
                                <button type='button' onClick={popupPostCode}>우편번호 검색</button>
                                {postAddress}
                                <input type="text" name="detailAddress" placeholder='상세주소' onChange={onChangeHandler} />
                        
                                <div id='popupDom'>
                                    {isPopupOpen && (
                                        <PopupDom>
                                            <SearchAddress onClose={popupPostCode} setPostAddres={setPostAddress}/>  
                                        </PopupDom>
                                    )}
                                </div>
                               
                                {
                                    postAddress !== ""&&<KakaoMap address={postAddress} width="500px" height="300px"/>
                                }
                                                          
                            </div><br/>
                            <button onClick={onSubmit}>등록하기</button>
                            <button onClick={()=>navigate(-1)}>취소</button>
                        </>
                    )   
                }   


                { 
                    option==="모집글" &&(
                    
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
                                onChange={(e) => setSexValue(e.currentTarget.value)}
                            >
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
                        </div>
                        */}
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
                                        name="imgFile"/>
                                
                                            {
                                            imgUrl.map((img) => {
                                                return (
                                                <div key={img.id}>
                                                    <img src={img ? img : ""}  style={{height: "300px", width : "300px"}}/>
                                                </div>
                                                )
                                                })
                                            }
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
                            <input type="text" value={postAddress} placeholder='버튼을 클릭해주세요' style={{width: "70%"}}/>
                            <button type='button' onClick={popupPostCode}>우편번호 검색</button><br/>
                            {/* {postAddress} */}
                            <input type="text" name="detailAddress" placeholder='상세주소' onChange={onChangeHandler} style={{width: "70%"}}/>
                            <div id='popupDom'>
                                {isPopupOpen && (
                                    <PopupDom>
                                        <SearchAddress onClose={popupPostCode} setPostAddres={setPostAddress}/>  
                                    </PopupDom>
                                )}
                            </div>    
                            {
                                postAddress !== ""&&<KakaoMap address={postAddress} width="500px" height="300px"/>
                            }                   
                           
                        </div>
                        <br/>
                        <button onClick={onSubmit2}>등록하기</button>
                        <button onClick={()=>navigate(-1)}>취소</button>
                    </>)
                }      
            </div>
        </Layout>
    );
};

export default Post;