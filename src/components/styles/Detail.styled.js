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