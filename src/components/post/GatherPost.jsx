import React, {useState, useRef} from 'react';
import { useDispatch} from 'react-redux';
import {__addPost2} from "../../redux/modules/PostSlice2"
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
import {STNumber, STButton, STSelect, STSelectButton, AllButton, AllInput, AllTextarea, StSearchBox, RegionButton, AddressBox, AddressInput, ModalWrap} from '../styles/GatherDetail.styled'

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
            if(counter>0){
                setCounter(counter-1)
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

            // //모집인원, 카테고리, 성비관련, 행사시작, 연령대, 제목, 내용, 카카오링크
            if(counter<1){return (alert('모집인원을 입력하세요'))}
            if(gatherPosts.category===""){return (alert('카테고리를 입력하세요'))}
            if(sexValue===""){return (alert('성비를 선택하세요'))}
            if(gatherPosts.startAge===""||gatherPosts.endAge===""){return (alert('연령대를 입력하세요'))}
            if(gatherPosts.title===""){return (alert('제목을 입력하세요'))}
            if(gatherPosts.content===""){return (alert('내용을 입력하세요'))}
            if(gatherPosts.date===""){return (alert('행사시작 일자를 입력하세요'))}
            if(gatherPosts.kakaoLink===""){return (alert('연락할 카카오 링크를 입력하세요'))}

            // //링크 검사(행사장링크 필수 아님)
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
            
            const obj2 = {
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
            console.log(obj2)
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

    //주소 앞에 두글자 따기
    const region = postAddress.split("")[0]+postAddress.split("")[1]

    return (
        <>
            <STNumber>
                <STButton onClick={handleAdd}>+</STButton> {counter===0? "모집인원" : counter}<STButton onClick={handleminus}>-</STButton>
            </STNumber>
            <br/><br/>

            <STSelect name="category" onChange={onChangeHandler2} >
                <option>카테고리</option>
                <option value="마라톤">마라톤</option>
                <option value="페스티벌">페스티벌</option>
                <option value="전시회">전시회</option>
                <option value="공연">공연</option>
                <option value="기타">기타</option>
            </STSelect>

            <ButtonGroup className="mb-2">
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
            </ButtonGroup><br/>

            <AllInput type="date" name="date" onChange={onChangeHandler2} min={today2} style={{width : "48%"}}/>
            <AllInput type="text" placeholder='나이' name="startAge" style={{width: "60px"}} onChange={onChangeHandler2}/> ~ {''}
            <AllInput type="text" placeholder='나이' name="endAge" style={{width: "60px"}} onChange={onChangeHandler2}/>
            <br/>
                
            <label>글 작성</label><br/>
            <AllInput type="text" placeholder="제목" name="title" onChange={onChangeHandler2} style={{width : "100%"}}/>
          
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
                            multiple />
                     
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

            <AllTextarea type="text" placeholder="소개글" name="content" onChange={onChangeHandler2} style={{height : '200px'}}/>

            <br/><label>카카오 링크</label><br/>
            <AllInput type="text" placeholder="링크" name="kakaoLink" onChange={onChangeHandler2} style={{width : "100%"}}/>

            <br/><label>행사장 링크</label><br/>
            <AllInput type="text" placeholder="링크" name="postLink" onChange={onChangeHandler2} style={{width : "100%"}}/>

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
                                    <AddressInput type="text" name="detailAddress" placeholder='상세주소' onChange={onChangeHandler2} style={{width: "80%"}}/>
                                    <KakaoMap address={postAddress} width="328px" height="300px"/>
                                </>)
                        }
                </AddressBox >                                            
            </div><br/>
    
            <div>
                <AllButton style={{background:"#B6B6B6"}} onClick={onSubmit2}>등록하기</AllButton>
                {/* <AllButton onClick={()=>navigate(-1)}>취소</AllButton>      */}
            </div>
        </>
    )
}

export default GatherPost;

const STSelectButton2 = styled(ToggleButton)`
    background-color: #F4F4F4;
    color : #AEAEAE;
    border : transparent;
    height : 32px;
    font-size: 14px;
`