import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Redux import
import { __getMyInfo } from '../../redux/modules/myPageSlice';
import { useDispatch, useSelector } from 'react-redux';

// Component import 
import Layout from '../../components/layout/Layout';
import { flexColumn } from '../../components/styles/Flex';
// import { ProfileImg } from '../../assets';
import Button from '../../components/elements/Button';
import { flexBetween, flexEvenly, flexRow } from '../../styles/Flex';
import { BookmarkFill, Comment, MyPost } from '../../assets';





//   cookies
// import { delCookie, getCookie } from '../../cookie/cookie';


const MyPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.myPage.userInfo);
    console.log("data ===> ",data)
    const token = localStorage.getItem("token");
    // const nickName = localStorage.getItem("nickName");
    const nickName = data.nickName;
    // const email = localStorage.setItem("email", data.email);
    const userImgUrl = localStorage.getItem("userImgUrl");


    // const userProfileImg = () => {
    //   if (nickName === null) {
    //     return <ProfileImg onClick={() => navigate("/login")} />;
    //   } else {
    //     if (userImgUrl === null || userImgUrl === undefined) {
    //       return <ProfileImg />;
    //     } else {
    //       return <img src={userImgUrl} alt="" />;
    //     }
    //   }
    // };


    // useEffect(() => {
    //     dispatch(__getMyInfo(nickName));
    //   }, [nickName, JSON.stringify[data]]);
    useEffect(() => {
        dispatch(__getMyInfo(token));
      }, [token, JSON.stringify[data]]);

      
      const MyPageList = ({ listName, onClick }) => {
        return (
          <div>
            <div className="listTitle" onClick={onClick}>
              {listName}
            </div>
          </div>
        );
      };

// 로그아웃
const handleLogout = () => {
    localStorage.clear();
    // delCookie("nickName");
    // delCookie("email")
    // delCookie("userImg")
    // delCookie("addressTag")
    navigate("/")
}


    return (
        <Layout>
            {/* <div>
                <h1>마이페이지</h1>
            </div> */}

            <MyPageWrap>
          <MyProfileWrap>
            <MyImgContainer>
              <MyImgBox>
                < img src={userImgUrl} alt={'ProfileImg'} />
                {/* {userProfileImg()} */}
                </MyImgBox>
            </MyImgContainer>
            {/* MyImgContainer */}

            <NickBox>

                    <div className="nickName">
                      {nickName}
                    </div>
                    <Btns>
                    <Button btnType = "submit" onClick={() => { navigate("/mypageedit")}}>프로필 수정</Button>
                    <Button btnType= "submit" onClick={handleLogout}>로그아웃</Button>
                    </Btns>
              </NickBox>
              {/* NickBox */}
            </MyProfileWrap>
            {/* MyProfileWrap */}

            {/* <MyStateWrap>
                <div className="MyStateWrap">
                  <div
                    className="stateBox"
                    onClick={() => navigate("/mypagepost")}>
                    <div className="title">내가 쓴 글</div>
                  </div>
                  <StateBox>
                    <div
                      className="stateBox"
                      onClick={() => navigate("/mypagecomment")}>
                      <div className='title'>댓글 단 글</div>
                    </div>
                  </StateBox>
                  <div
                    className="stateBox"
                    onClick={() => navigate("/mypagescrap")}>
                    <div className="title">스크랩</div>
                  </div>
                </div>
          </MyStateWrap> */}
          {/* MyStateWrap */}
          <MyCateWrap>
            <CateBox>
              <div className='title'>내가 쓴 글</div>
              <MyPost />

            </CateBox>
            <CateBox >
              <div className='title'>댓글 단 글</div>
              <Comment />

            </CateBox>
            <CateBox >
              <div className='title'>스크랩</div>
              <BookmarkFill />

            </CateBox>
          </MyCateWrap>
          {/* MyCateWrap */}

         

            </MyPageWrap >
            {/* MyPageWrap */}
        </Layout>
    );
};

export default MyPage;



const MyPageWrap = styled.div`
  ${flexColumn}
  margin-top: 55px;
  overflow: auto;
  margin: 55px auto;
`;
const MyProfileWrap = styled.div`
${flexColumn};
  gap: 25px;
  margin: 15px 20px 20px 20px;
`;
const MyImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
`;
const MyImgBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  img {
    display: flex;
    width: 150px;
    height: 100%;
    border-radius: 120px;
  }
  svg {
    display: flex;
    width: 150px;
    height: 100%;
    border-radius: 120px;
  }
`;

const NickBox = styled.div`
  width: 100%;
  height: 100%;
  ${flexColumn}
  gap: 20px;
  .nickName {
    font-size: 28px;
    font-weight: 500;
    line-height: 38px;
  }
`;

const Btns = styled.div`
  ${flexRow}
  gap: 10px;
`
const MyCateWrap = styled.div`
  width : 100%;
  display: flex;
  margin-top : 30px;
  font-size : 18px;
  font-weight: 400;
  padding : 17px 26px;
  gap : 16px;

`

const CateBox = styled.div`
  ${flexColumn};
  flex: 1;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding : 17px 26px;


  
`

