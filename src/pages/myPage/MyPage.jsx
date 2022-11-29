import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Redux import
import { __getMyInfo } from '../../redux/modules/myPageSlice';
import { __delAdminPost } from '../../redux/modules/postSlice';
import { useDispatch, useSelector } from 'react-redux';

// Component import 
import Layout from '../../components/layout/Layout';
import { flexColumn } from '../../components/styles/Flex';
// import { ProfileImg } from '../../assets';
import Button from '../../components/elements/Button';
import { flexBetween, flexEvenly, flexRow } from '../../components/styles/Flex';
import { BookmarkFill, Comment, MyPost } from '../../assets';

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.myPage);

  //유저 정보 받아오기
  useEffect(() => {
    dispatch(__getMyInfo());
  }, []);

  // 로그아웃
  const handleLogout = () => {
    localStorage.clear();
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
              < img src={userInfo.userImg} alt={'ProfileImg'} />
              {/* {userProfileImg()} */}
            </MyImgBox>
          </MyImgContainer>
          {/* MyImgContainer */}

          <NickBox>

            <div className="nickName">
              {userInfo.nickName}
            </div>
            <Btns>
              <Button btnType="submit" onClick={() => { navigate("/mypageedit") }}>프로필 수정</Button>
              <Button btnType="submit" onClick={handleLogout}>로그아웃</Button>
            </Btns>
          </NickBox>
          {/* NickBox */}
        </MyProfileWrap>
        {/* MyProfileWrap */}

        <MyCateWrap>
          <CateBox onClick={() => navigate("/mypagepost")}>
            <div className='title'>내가 쓴 글</div>
            <MyPost />

          </CateBox>
          <CateBox onClick={() => navigate("/mypagecomment")}>
            <div className='title'>댓글 단 글</div>
            <Comment />

          </CateBox>
          <CateBox onClick={() => navigate("/mypagescrap")}>
            <div className='title'>스크랩</div>
            <BookmarkFill />

          </CateBox>
        </MyCateWrap>
        {/* MyCateWrap */}
        <div>
          {
            userInfo.adminPage !== undefined &&
            userInfo.adminPage !== null &&
            userInfo.adminPage.map((post) => {
              return (
                <div key={post.id}>
                  {post.title}
                  <button onClick={() => { dispatch(__delAdminPost(post.id)) }}>삭제</button>
                </div>
              )
            })
          }
        </div>


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
  padding : 17px 20px;
  gap : 16px;

`

const CateBox = styled.div`
  ${flexColumn};
  gap:7px;
  flex: 1;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding : 17px 12px;


  
`

