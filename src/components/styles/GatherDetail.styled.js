import styled from 'styled-components';
export const STNumber = styled.div`
    float: right;
    border-radius: 8px;
    background-color: #F4F4F4;
    width : 48%;
    font-size: 14px;
    text-align: center;
    height : 32px;
`
export const STButton = styled.button`
    background-color: #E1E3EC;
    font-size: 20px;
    border-radius: 20px;
    border:transparent;
    /* vertical-align: middle; */
    height : 30px;
    position : absolute;
    transform: translateY(-50%);
    top : 50%;
    padding-left: 10px;
    padding-right : 10px;
`
export const STSelect = styled.select`
    font-size: 14px;
    background-color: #F4F4F4;
    width : 48%;
    border-radius: 10px;
    border : transparent;
    padding:5px;
    height : 32px;
`
export const STSelectButton = styled.div`
    margin-right: 8px;
`

export const AllButton = styled.button`
    width : 100%;
    height: 48px;
    border: transparent;
`
export const AllInput = styled.input`
    border-radius: 10px;
    background-color: #F4F4F4;
    border : transparent;
    font-size: 14px;
    height : 32px;
    margin-right: 7px;
`
export const AllTextarea = styled.textarea`
    border-radius: 10px;
    border: transparent;
    width :100%;
    background-color: #F4F4F4;
`

export const StSearchBox = styled.div`
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
export const RegionButton = styled.button`
    border-radius: 14px;
    border: transparent;
    background-color: #D9D9D9;
`
export const AddressBox = styled.div`
    margin : 20px 20px 20px 20px;
`
export const AddressInput = styled.input`
    border-radius: 5px;
    margin-bottom: 5px;
    border: transparent;
    background-color: #F4F4F4;
    float : right;
`
export const ModalWrap = styled.div`
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
