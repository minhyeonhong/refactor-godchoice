import React, {useState, useRef} from 'react';
import { __addPost} from '../../redux/modules/postSlice';
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


const FestivalPost =() => {

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

            //카테고리, 행사시작, 행사마감, 글작성, content 검사
            if(festival.category===""){return (alert('카테고리를 입력하세요'))}
            if(festival.startPeriod===""){return (alert('행사시작 일자를 입력하세요'))}
            if(festival.endPeriod===""){return (alert('행사마감 일자를 입력하세요'))}
            if(festival.title===""){return (alert('제목을 입력하세요'))}
            if(festival.content===""){return (alert('내용을 입력하세요'))}

            //링크 검사
            const arr = festival.postLink.indexOf("http://"||"https://") !==-1
            if(festival.postLink!==""){
                if(arr===false){
                    return(alert('http:// 또는 https://가 포함된 링크를 입력해주세요'))
                }
            }
        
            
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
                 category : festival.category,
                 startPeriod : festival.startPeriod,
                 endPeriod : festival.endPeriod,
                 title:festival.title,
                 content:festival.content,
                 
                 postAddress: postAddress+festival.detailAddress, //상세 주소 내용 추가
                 postLink : festival.postLink,
                 }
                 console.log(obj)
                 formData.append("eventPostReqDto", new Blob([JSON.stringify(obj)], { type: "application/json" }));
        
             dispatch(__addPost(formData));
             //window.location.replace("/")
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
    
    //주소 앞에 두글자 따기
    const region = postAddress.split("")[0]+postAddress.split("")[1]

    return (
          <>
            <STSelect style={{width :"50%"}} name="category" onChange={onChangeHandler}>
                <option>카테고리</option>
                <option value="마라톤">마라톤</option>
                <option value="페스티벌">페스티벌</option>
                <option value="전시회">전시회</option>
                <option value="공연">공연</option>
                <option value="기타">기타</option>
            </STSelect>

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

            <Hr/>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>글 작성</Form.Label>
                    <Form.Control type="text" placeholder="제목" name="title" onChange={onChangeHandler} />
                </Form.Group>

            <div><br/>
                {
                    imgUrl.length ===0? 
                    (
                    <STPicture style={{width : "192px", height :"192px", float : "left"}}>
                        <Img src={pictureAdd} />
                    </STPicture>
                    ) : 
                    ( 
                        <Carousel fade>
                            {
                                imgUrl.map((img) => {
                                    return (
                                        <Carousel.Item key={img.id}>            
                                            <img style={{width:'550px'}} src={img} />  
                                        </Carousel.Item>)
                                })
                            }
                        </Carousel>
                    )
                }
                <STUploadButton onClick={()=> { imgRef.current.click()}}>+</STUploadButton><br/>

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
                    </label>
            </div >
            <AllTextarea type="text" placeholder="행사글을 띄어쓰기 포함 2500자 이내로 입력해주세요" name="content" onChange={onChangeHandler} maxLength={2500} style={{height : '200px', width: "100%"}}/>
            <Hr/>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>행사장 링크</Form.Label>
                <Form.Control type="text" placeholder="링크" name="postLink" onChange={onChangeHandler} />
            </Form.Group>

            {/* 주소 부분 */}
            <div>
                <StSearchBox onClick={popupPostCode}>
                    <button ><FiSearch style={{ width: '20px', height: '20px', color: '#FFAE00' }}/></button>
                </StSearchBox>

                {isPopupOpen && (
                                <ModalWrap>
                                        <SearchAddress setPostAddres={setPostAddress} popupPostCode={popupPostCode}/>  
                                </ModalWrap>
                          )}
                
                <AddressBox >
                        {
                            postAddress !== ""&&(
                                <>
                                    <RegionButton>{"#"+region}</RegionButton>
                                    <AddressInput type="text" value={postAddress} placeholder='우편번호 검색을 클릭해주세요' style={{width: "80%"}}/>
                                    <AddressInput type="text" name="detailAddress" placeholder='상세주소' onChange={onChangeHandler} style={{width: "80%"}}/>
                                    <KakaoMap address={postAddress} width="328px" height="300px"/>
                                </>)
                        }
                </AddressBox >                                            
            </div><br/>
            <AllButton style={{background:"#B6B6B6"}} onClick={onSubmit}>작성</AllButton>
            {/*<AllButton onClick={()=>navigate(-1)}>취소</AllButton>  <AddressModal />*/}   
            
        </>

    )
}

export default FestivalPost;

const Hr = styled.hr`
    background-color : #F4F4F4;
    margin : 10px 5px 5px 5px;
`

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
const STSelect = styled.select`
    font-size: 14px;
    background-color: #F4F4F4;
    width : 48%;
    border-radius: 10px;
    border : transparent;
    padding:5px;
    height : 32px;
`
//modal
const ModalWrap = styled.div`
  position: absolute;
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

