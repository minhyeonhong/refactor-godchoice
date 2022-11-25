import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import X from "../../assets/images/common/X.png";


const WritingToggle = ({modalOn, setModalOn}) => {
    const navigate = useNavigate();
    return (
<WritingToggleWrap>
    <img src={X} onClick={()=> {setModalOn(!modalOn)}}  />
    
        <Cate onClick={()=>navigate("/festivalpost")} style={{marginTop:"17px"}}>행사글</Cate>
        <Cate onClick={()=>navigate("/gatherpost")}>모집글</Cate>
        <Cate onClick={()=>navigate("/questionpost")}>질문글</Cate>
</WritingToggleWrap>
)
};

export default WritingToggle;

const WritingToggleWrap = styled.div`
z-index : 999;
background-color: gray;
opacity : 0.8;
color : #fff;
border-radius : 20px;
padding : 10px;
width: 100px;
height: 160px;
position: fixed;
bottom: 45px;
right:120px;
text-align : center;
img {
    width: 20px;
    height: 20px;
    position:absolute;
    right: 10px;
}`

const Cate = styled.div`
    cursor : pointer;
    padding: 8px;
`

