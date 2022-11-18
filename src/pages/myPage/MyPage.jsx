import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Redux import
import { __getMyInfo } from '../../redux/modules/myPageSlice';
import { useDispatch, useSelector } from 'react-redux';

// Component import 
import Layout from '../../components/layout/Layout';
import userProfile from '../../assets/images/common/userProfile.png'





//   cookies
// import { delCookie, getCookie } from '../../cookie/cookie';


const MyPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.myPage?.myPage);
    const nickName = localStorage.getItem("nickName");
    const userImg = localStorage.getItem("userImg");
    // const email = localStorage.getItem("email");

    // const basicProfileImg = () => {
    //   if (nickName === null) {
    //     return <BasicProfile onClick={() => navigate("/login")} />;
    //   } else {
    //     if (data?.userImgUrl === null || data?.userImgUrl === undefined) {
    //       return <BasicProfile />;
    //     } else {
    //       return <img src={data?.userImgUrl} alt="" />;
    //     }
    //   }
    // };


    useEffect(() => {
        dispatch(__getMyInfo(nickName));
      }, [nickName, JSON.stringify[data]]);

      
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
            <div>
                <h1>마이페이지</h1>
            </div>

            <MyPageWrap>
          <MyProfileWrap>
            <MyImgContainer>
              <MyImgBox>< img src={userImg} alt={'userImg'} /></MyImgBox>
            </MyImgContainer>
            {/* MyImgContainer */}

            <NickBox>
                {nickName !== null ? (
                  <>
                    <div className="nickName">
                      {/* {data?.nickName} */}
                      {nickName}
                    </div>
                    <div
                      className="myPageEdit"
                      onClick={() => {
                        navigate("/mypageedit");
                      }}>
                      프로필 수정
                    </div>
                  </>
                ) : (
                  <>
                    <div className="needNickName" onClick={() => navigate("/login")}>
                      로그인이 필요합니다.
                    </div>
                  </>
                )}
              </NickBox>
              {/* NickBox */}
            </MyProfileWrap>
            {/* MyProfileWrap */}

            <MyStateWrap>
            {nickName === null ? (
              <>
                <div className="MyStateWrap" onClick={() => navigate("/login")}>
                  <div className="stateBox">
                    <div className="title">내가 쓴 글</div>
                  </div>
                  <StateBox>
                  <div className="stateBox">
                    <div className="title">댓글 단 글</div>
                  </div>
                  </StateBox>
                  <div className="stateBox">
                    <div className="title">스크랩</div>
                  </div>
                </div>{" "}
              </>
            ) : (
              <>
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
              </>
            )}
          </MyStateWrap>
          {/* MyStateWrap */}

          <div>
          {nickName === null ? (
              <MyPageList
                listName={`로그인`}
                onClick={() => navigate("/login")}
              />
            ) : (
              <MyPageList
                listName={`로그아웃`}
                onClick={() => handleLogout()}
              />
            )}
          </div>

            </MyPageWrap >
            {/* MyPageWrap */}
        </Layout>
    );
};

export default MyPage;



const MyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  height: ${(props) =>
    props.isIOS ? `calc(100vh - 150px)` : `calc(100vh - 140px)`};
  overflow: auto;
`;
const MyProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  margin: 15px 20px 20px 20px;
`;
const MyImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 73px;
  height: 73px;
`;
const MyImgBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  img {
    display: flex;
    width: 73px;
    height: 100%;
    border-radius: 120px;
  }
  svg {
    display: flex;
    width: 73px;
    height: 100%;
    border-radius: 120px;
  }
`;

const NickBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 1px;
  .nickName {
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
  }
  .myPageEdit {
    font-size: 14px;
    font-weight: 400;
    color: #9b9b9b;
  }
  .needNickName {
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
  }
`;

const MyStateWrap = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  margin-bottom: 40px;
  height: 86px;

  .MyStateWrap {
    display: flex;
    width: 350px;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 8px;
    background-color: powderblue;
    /* box-shadow: 1px 1px 4px 1px #dadce0; */

    .stateBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 114px;
      height: 100%;
      margin: 16px 0px;

      .title {
        display: flex;
        font-size: 18px;
        font-weight: 400;
        color: black;
      }
    }
  }
`;
const StateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 114px;
  height: 26px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  .title {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 18px;
    font-weight: 400;
    color: #6d6d6d;
  }
`;

