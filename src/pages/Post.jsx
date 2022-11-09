import React, {useState, useEffect, useRef} from 'react';
import Layout from '../components/layout/Layout';
//import Footer from "../components/layout/Footer"
import Form from 'react-bootstrap/Form';
//import Input from '../hooks/useInput'
import SearchAddress from './SearchAddress';
import PopupDom from './PopupDom';
import { useDispatch, useSelector } from 'react-redux';
import { __addPost,  __getPost } from '../redux/modules/PostSlice';
import {__addPost2,__getPost2 } from "../redux/modules/PostSlice2"
import imageCompression from 'browser-image-compression';
import MapApi from './MapApi';


const Post = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state)=> state.posts.posts)
    const gatherPost = useSelector((state)=> state.gatherPosts.gatherPosts)
    

    const [postAddress, setPostAddress] = useState("")

    //1.이미지 업로드 부분
    const [imgFile, setImgFile] = useState([]);
    const [imgUrl, setImgUrl] = useState([]);
    const imgRef = useRef();

    const onChangeImage = (e) => {
        const files = e.currentTarget.files;
  
        if ([...files].length > 5) {
          alert('이미지는 최대 3개까지 업로드가 가능합니다.');
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


    //2-1 게시글 작성 - 행사글
        
        const [festival, setFestival] = useState({
            category : "",
            startPeriod : "",
            endPeriod : "",
            title : "",
            content : "",
            link : "",
            //multiFile : "" 
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
                  formData.append("multiFile", file);
                })
              } else {
                formData.append("multiFile", null);
              }
               
            //폼 데이터에 데이터 넣기
            formData.append("postId", posts.length+1);
            formData.append("category", festival.category);
            formData.append("startPeriod", festival.startPeriod);
            formData.append("endPeriod", festival. endPeriod);
            formData.append("title", festival.title);
            formData.append("content", festival.content);
            formData.append("postAddress", postAddress);
            //formData.append("link", festival.link);

            
            //Api 날리기
            dispatch(__addPost(formData));
            //window.location.replace("/postlist")

            // dispatch(__addPost({
            //     postId:posts.length+1,
            //     category : festival.category,
            //     startPeriod : festival.startPeriod,
            //     endPeriod : festival.endPeriod,
            //     title : festival.title,
            //     content : festival.content,
            //     postAddress : postAddress,
            //     link : festival.link,}))

                // if(festival.title.trim() === ""|| !festival.content.trim() === "" ||!festival.link.trim() === "") {
                //     return alert("모든 항목을 입력해주세요.");
                // }
        }


    //2-2 게시글 작성 - 모집글
        const [gatherPosts, setGatherPosts] = useState({
            category :"",
            date : "",
            number: "",
            kakaoLink:"",
            sex:"",
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
                  formData.append("multiFile", file);
                })
              } else {
                formData.append("multiFile", null);
              }
            
            //폼 데이터에 데이터 넣기
            formData.append("postId", gatherPost.length+1);
            formData.append("category", gatherPost.category);
            formData.append("date", gatherPost.date );
            formData.append("number", gatherPost.number);
            formData.append("kakaoLink", gatherPost.kakaoLink);
            formData.append("sex", gatherPost.sex);
            formData.append("startAge", gatherPost.startAge);
            formData.append("endAge", gatherPost.endAge);
            formData.append("content", gatherPost.content);
            formData.append("postLink", gatherPost.postLink);
            formData.append("postAddress", postAddress);


            dispatch(__addPost2(formData));
            //window.location.replace("/postlist")

            // dispatch(__addPost2({
            //     postId:gatherPost.length+1,
            //     category :gatherPosts.category ,
            //     date : gatherPosts.date,
            //     number: gatherPosts.number,
            //     kakaoLink: gatherPosts.kakaoLink,
            //     sex: gatherPosts.sex,
            //     startAge: gatherPosts.startAge,
            //     endAge: gatherPosts.endAge,
            //     title: gatherPosts.title,
            //     content: gatherPosts.content,
            //     postLink: gatherPosts.postLink,
            //     postAddress:postAddress  ,
            
           // }))

                // if(festival.title.trim() === ""|| !festival.content.trim() === "" ||!festival.link.trim() === "") {
                //     return alert("모든 항목을 입력해주세요.");
                // }
        }


    //글작성 get 가져오기
    // useEffect(() => {
    //     dispatch(__getPost())
    //   }, [dispatch])

    //모집글 get 가져오기
    // useEffect(() => {
    //     dispatch(__getPost2())
    //   }, [dispatch])

    //map 가져오기
    

    // 주소 API 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
    const popupPostCode = () => {
        setIsPopupOpen(!isPopupOpen)
    }

    // 모집 구분글
    const [option, setOption] = useState();

    //-----------------------------------------------------------------
    //map 가져오기

    // const [map,setMap] = useState(null);

    // useEffect(()=>{
    //     const container = document.getElementById('map');
    //     const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
    //     const kakaoMap = new kakao.maps.Map(container, options);
    //     setMap(kakaoMap);
    // },[])

    return (
        <Layout>
            <div>
                <Form.Select aria-label="Default select example" style={{width :"250px"}}
                value="option" onChange={(e)=>setOption(e.target.value)}>
                    <option>모집 구분</option>
                    <option value="글작성">글작성</option>
                    <option value="모집글">모집글</option>
                </Form.Select>
             
                {
                    option==="글작성" &&
                        (<div>
                            <label>글작성</label>
                            <Form.Select aria-label="Default select example" style={{width :"250px"}} name="category" onChange={onChangeHandler}>
                                <option>카테고리</option>
                                <option value="마라톤">마라톤</option>
                                <option value="페스티벌">페스티벌</option>
                                <option value="전시회">전시회</option>
                            </Form.Select>
                        
                            <input type="date" name="startPeriod" onChange={onChangeHandler} min={new Date()} /> ~ 
                            <input type="date" name="endPeriod" onChange={onChangeHandler}  min={new Date()} />
                            
                            <div>
                                <label>글 작성</label><br/>
                                <input type="text" placeholder="제목" name="title" onChange={onChangeHandler}/>
                            </div>

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

                            <input type="text" placeholder="소개글" name="content" onChange={onChangeHandler}/>
                            {/* <div>
                                <label>행사장 링크</label>
                                <input type="text" placeholder="링크" name="link" onChange={onChangeHandler}/>
                            </div> */}
                            
                            <div>
                                <button type='button' onClick={popupPostCode}>우편번호 검색</button>
                        
                                <div id='popupDom'>
                                    {postAddress}
                                    {isPopupOpen && (
                                        <PopupDom>
                                            <SearchAddress onClose={popupPostCode} setPostAddres={setPostAddress}/>  
                                        
                                        </PopupDom>
                                    )}
                                </div>
                                <MapApi />
                                <button onClick={onSubmit}>등록하기</button>
                            </div>
                        </div>
                    )   
                }   


                { 
                    option==="모집글" &&(<div>

                        <label>모집글</label>
                        <div>
                            <label>모집인원</label><br/>
                            <input type="text" placeholder="제목" name="number" onChange={onChangeHandler2}/>
                        </div>                  
                        <Form.Select aria-label="Default select example" style={{width :"250px"}} name="category" onChange={onChangeHandler2}>
                            <option>카테고리</option>
                            <option value="마라톤">마라톤</option>
                            <option value="페스티벌">페스티벌</option>
                            <option value="전시회">전시회</option>
                        </Form.Select>
                        {/* 제외할 것 같다. <Form.Select aria-label="Default select example" style={{width :"250px"}}>
                            <option>연락방법</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select> */}

                        <input type="date" name="date" onChange={onChangeHandler2} /> 
                        

                        <select name="sex" onChange={onChangeHandler2} >
                            <option value="NF">성비무관</option>
                            <option value="M">남</option>
                            <option value="W">여</option>
                        </select>
                        <div>
                            <label>글 작성</label><br/>
                            <input type="text" placeholder="제목" name="title" onChange={onChangeHandler2}/>
                        </div>
                       
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


                        <input type="text" placeholder="소개글" name="content" onChange={onChangeHandler2}/>
                        <div>
                            <label>카카오 링크</label>
                            <input type="text" placeholder="링크" name="kakaoLink" onChange={onChangeHandler2}/>
                        </div>

                        <div>
                            <input type="text" placeholder='나이' name="startAge" style={{width: "60px"}} onChange={onChangeHandler2}/> ~ 
                            <input type="text" placeholder='나이' name="endAge" style={{width: "60px"}} onChange={onChangeHandler2}/>
                        </div>
                            <div>
                                <label>행사장 링크</label>
                                <input type="text" placeholder="링크" name="postLink" onChange={onChangeHandler2}/>
                            </div>
                            
                            
                        <div>
                            <button type='button' onClick={popupPostCode}>우편번호 검색</button>
                        
                            <div id='popupDom'>
                                {postAddress}
                                {isPopupOpen && (
                                    <PopupDom>
                                        <SearchAddress onClose={popupPostCode} setPostAddres={setPostAddress}/>  
                                    </PopupDom>
                                )}
                            </div>                       
                            <button onClick={onSubmit2}>등록하기</button>
                        </div>
                    </div>)
                }


                
            </div>
            {/* 확인하기 위한 것 - 행사글 게시글 작성 */}
            {/* {
                posts.length > 0 &&(posts.map((post)=> (
                <div key={post.id}>
                    <div>카테고리 : {post.category}</div>
                    <div>{post.startPeriod} ~ {post.endPeriod}</div>
                    <img src={Racoon} style={{width:"300px", height: "300px"}} /><br/>
                    <div>제목 : {post.title}</div>
                    <div>내용 : {post.content}</div>
                    <div>주소 : {post.postAddress}</div>
                    <div>링크 : {post.link}</div>
                    <hr/>
                </div>
                )))
            } */}
            
            {/* 확인하기 위한 것 - 모집글 게시글 작성 */}
            {/* {
                gatherPost !== undefined &&(gatherPost.map((item)=>(
                    <div key={item}>
                        <div>{item.category}</div>
                        <div>{item.date}</div>
                        <div>{item.number}</div>
                        <div>{item.kakaoLink}</div>
                        <div>{item.sex}</div>
                        <div>{item.startAge}~{item.endAge}</div>
                        <div>{item.title}</div>
                        <div>{item.content}</div>
                        <div>{item.postLink}</div>
                        <div>{item.postAddress}</div>
                        <hr/>
                    </div>)
                ))
            } */}
        </Layout>
    );
};

export default Post;