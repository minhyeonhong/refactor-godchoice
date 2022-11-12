import React, { useState } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { FiSearch } from 'react-icons/fi'

const Search = () => {

    const [radioProp, setRadioProp] = useState({
        label: "진행중",
        checked: true
    });
    const radioHandle = (e) => {
        if (e.target.checked) {
            setRadioProp({
                label: "진행중",
                checked: true
            });
        } else {
            setRadioProp({
                label: "마감",
                checked: false
            });
        }
    }

    return (
        <StSearchWrap>
            <StSearchBox>
                <button><FiSearch style={{ width: '20px', height: '20px', color: '#FFAE00' }} /></button>
                <input />
            </StSearchBox>
            <StTagBox>
                <button>#전국</button>
                <button>#서울</button>
                <button>#강원도</button>
                <button>#경기도</button>
                <button>#충청도</button>
                <button>#전라도</button>
                <button>#경상도</button>
                <button>#제주도</button>
            </StTagBox>
            <StFilterBox>
                <div>
                    <select>
                        <option value="">전체</option>
                        <option value="">인기</option>
                    </select>
                </div>
                <StRadioBox>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={radioProp.checked}
                        onChange={radioHandle}
                    />
                    <label>{radioProp.label}</label>
                </StRadioBox>
            </StFilterBox>
        </StSearchWrap>
    );
};

export default Search;

const StSearchWrap = styled.div`
    height : 140px;
    //background-color : pink;
    display:flex;
    flex-direction: column;
    justify-content : space-evenly
`

const StSearchBox = styled.div`
    background: #EEEAE3;
    box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius : 30px;
    display : flex;
    flex-direction : row;
    margin : 0px 10px;
    height : 36px;
    input{
        width : 100%;
        background-color : transparent;
        border : none;
        border-radius : 0 30px 30px 0;
    }
    button{
        background-color : transparent;
        border : none;
        border-radius :  30px 0 0 30px ;
        
    }
`

const StTagBox = styled.div`
    width : 355px;
    overflow : scroll;
    display :flex;
    flex-direction : row;
    gap : 5px;
    margin : 0 10px;
    /* 가로 스크롤 */
    overflow: auto;
    white-space: nowrap;
    ::-webkit-scrollbar{
        display: none; 
    }
    button{
        border : none;
        border-radius :  50px ;
        background-color : #F7DBB4;
    }
`

const StFilterBox = styled.div`
    display :flex;
    flex-direction : row;
    margin : 0px 10px;
    justify-content : space-between;
    select {
        width: 75px;
        height: 32px;
        color : white;
        background: #E79C00;
        border-radius: 8px;
        border : none;
    }
`

const StRadioBox = styled.div`
    width : 110px;
    display : flex;
    flex-direction : row;
    align-items : center;
    gap : 10px;
    label {
        font-family : 'Pretendard Variable';
    }
    .form-check-input:checked {
        background-color : #5A431F;
    }
    .form-switch .form-check-input {
        width : 52px;
        height : 32px;
        background-image : url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e");
    }
    .form-check-input{
        background-color : #D9D9D9;
        box-shadow : none;
        border : none;
    }
`