import styled from 'styled-components';

export const StWrap = styled.div`
    width : 95%;
    display:flex;
    flex-direction : column;
    margin : 0 auto;
    gap : 5px;
`

export const StTitleBox = styled.div`
    height : 34px;
    background-color : pink;
`
export const StImgBox = styled.div`
    margin : 0 auto;
    .main-img {
        width : 330px;
        height : 300px;
    }
    .sub-img-wrap {
        display:flex;
        flex-direction : row;
        gap : 5px;
    }
    .sub-img {
        width: 56px;
        height: 56px;
    }
    
`

export const StContentBox = styled.div`
    height : 70px;
    background-color : pink;
`

export const StEventLinkBox = styled.div`
    height : 70px;
    background-color : pink;
`

export const StEventPlaceBox = styled.div`
    height : 70px;
    background-color : pink;
    .address-box{
        display:flex;
        flex-direction :row;
        justify-content :space-between;
    }
    .tag {
        background-color : white;
        border : none;
        border-radius : 50px;
    }
    .address{

    }
`

export const StButtonBox = styled.div`
    display:flex;
    flex-direction :row;
    justify-content :space-between;
`

export const AllTextarea = styled.textarea`
border-radius: 10px;
border: 1px solid #C8C9CA;
`

//modal
export const ModalWrap = styled.div`
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
`