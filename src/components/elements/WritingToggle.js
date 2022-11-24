import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import X from "../../assets/images/common/X.png";


const WritingToggle = ({modalOn, setModalOn}) => {
    const navigate = useNavigate();
    return (
<WritingToggleWrap>
    <img src={X} onClick={()=> {setModalOn(!modalOn)}} />
    
        <Cate onClick={()=>navigate("/festivalpost")} >행사글</Cate>
        <Cate onClick={()=>navigate("/gatherpost")}>모집글</Cate>
        <Cate onClick={()=>navigate("/questionpost")}>질문글</Cate>
</WritingToggleWrap>
)
};

export default WritingToggle;

const WritingToggleWrap = styled.div`
background-color: grey;
color : #fff;
border-radius : 20px;
padding : 10px;
width: 100px;
height: 170px;
position: fixed;
bottom: 50px;
right:120px;
img {
    width: 20px;
    height: 20px;
    right: 0;
}`

const Cate = styled.div`
    cursor : pointer;
    padding: 8px;
`

