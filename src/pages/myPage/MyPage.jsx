import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Component import 
import Layout from '../../components/layout/Layout';
import { flexColumn } from '../../components/styles/Flex';
import Button from '../../components/elements/Button';
import { flexRow } from '../../components/styles/Flex';
import { BookmarkFill, Comment, MyPost } from '../../assets';
import { useQuery, useMutation } from '@tanstack/react-query';
import { myPageApis } from '../../api/api-functions/myPageApis';
import { postApis } from '../../api/api-functions/postApis';
import { useEffect } from 'react';

const MyPage = () => {
  const navigate = useNavigate();

  // 내정보 server state
  const [myInfo, setMyInfo] = useState({});
  //내정보 불러오기
  useQuery(['getMyPage'],
    () => myPageApis.getMyPageAX(), //fn
    {//options
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지
      onSuccess: res => {
        if (res.data.status === 200) {
          localStorage.setItem('userAddressTag', res.data.data.addressTag);
          setMyInfo(res.data.data);
        }
      }
    })

  //관리자 배너 삭제
  const deleteBanner = useMutation({
    mutationFn: id => {
      return postApis.deleteAdminPostAX(id);
    },
    onSuccess: res => {
      if (res.data.status === 200) {
        alert("삭제 성공");
        window.location.reload();
      }
    },
  })

  // 로그아웃
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      if (myInfo.domain === 'kakako') {
        logout.mutate(myInfo.domain);
      } else {
        //네이버 구글 똥같애
        localStorage.clear();
        navigate("/");
      }
    }
  }


  //로그아웃
  const logout = useMutation({
    mutationFn: domain => {
      return myPageApis.logoutAX(domain);
    },
    onSuccess: res => {
      if (res.data.status === 200) {
        localStorage.clear();
        navigate("/");
      }
    },
  })

  return (
    <Layout>
      <MyPageWrap>
        <MyProfileWrap>
          <MyImgContainer>
            <MyImgBox>
              < img src={myInfo.userImg} alt={'ProfileImg'} />
              {/* {userProfileImg()} */}
            </MyImgBox>
          </MyImgContainer>
          {/* MyImgContainer */}

          <NickBox>

            <div className="nickName">
              {myInfo.nickName}
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
          <CateBox onClick={() => navigate("/mypagepost")} style={{cursor:"pointer"}}>
            <div className='title'>내가 쓴 글</div>
            <MyPost />

          </CateBox>
          <CateBox onClick={() => navigate("/mypagecomment")} style={{cursor:"pointer"}}>
            <div className='title'>댓글 단 글</div>
            <Comment />

          </CateBox>
          <CateBox onClick={() => navigate("/mypagescrap")} style={{cursor:"pointer"}}>
            <div className='title'>스크랩</div>
            <BookmarkFill />

          </CateBox>
        </MyCateWrap>
        {/* MyCateWrap */}

        {/* admin일때 배너리스트 */}
        <div>
          {myInfo?.adminPage?.map((post) => {
            return (
              <div key={post.id}>
                {post.title}
                <button onClick={() => { deleteBanner.mutate(post.id) }}>삭제</button>
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


