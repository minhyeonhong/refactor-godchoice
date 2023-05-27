import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Camera, Delete } from "../../assets";
import Layout from "../../components/layout/Layout";
import kakao from "../../assets/logo_kakao.png";
import naver from "../../assets/logo_naver.png";
import google from "../../assets/logo_google.png";

import useImgUpload from "../../hooks/useImgUpload";
import { useQuery, useMutation } from '@tanstack/react-query';
import { myPageApis } from '../../api/api-functions/myPageApis';
import PageState from "../../components/common/PageState";
import useGetMyInfo from "../../hooks/useGetMyInfo";
import { fsUploadImage, updateDoc, doc, db } from "../../firebase";

const MyPageEdit = () => {
  const navigate = useNavigate();

  //이미지 업로드 훅
  const [files, fileUrls, uploadHandle] = useImgUpload(1, true, 0.5, 1000);

  //이미지 업로드 인풋돔 선택 훅
  const imgRef = useRef();

  const { userInfo, isLoading } = useGetMyInfo("users", localStorage.getItem("uid"));

  const onSubmit = async (event) => {
    event.preventDefault();

    const profile_image_url = files.length !== 0 ? await fsUploadImage(files[0]) : "";
    const nickname = event.target[1].value === "" ? userInfo.nickname : event.target[1].value;

    const modUserInfo = {
      nickname,
      profile_image_url
    }

    const res = await updateDoc(doc(db, "users", localStorage.getItem("uid")), modUserInfo);

    if (res === undefined) {
      navigate("/mypage");
    } else {
      alert("수정 실패");
    }
  }

  if (isLoading) {
    return < PageState
      display={'flex'}
      state='loading' imgWidth='25%' height='100vh'
      text='잠시만 기다려 주세요.' />;
  }

  return (
    <Layout>
      <MyProfile onSubmit={onSubmit}>
        <MyImgWrap>
          <MyImgBox>
            {userInfo.profile_image_url === "" ?
              < img src={fileUrls[0] || `${process.env.PUBLIC_URL}/kakao_base_profil.jpg`} alt={'ProfileImg'} />
              :
              <img src={fileUrls[0] || userInfo.profile_image_url} alt="my profil photo" />
            }

            <label htmlFor="img_UpFile">
              <Camera style={{ cursor: "pointer" }} />
            </label>
            <input
              ref={imgRef}
              type="file"
              accept="image/*"
              id="img_UpFile"
              name="files"
              onChange={uploadHandle}
              style={{ display: "none" }}
            />
          </MyImgBox>
        </MyImgWrap>

        <LoginInfo>
          <LoginInfoTitle>로그인 정보</LoginInfoTitle>
          <LoginInfoContent>
            {/* {userInfo.domain === 'google' && <img src={google} alt="logoImg" />}
            {userInfo.domain === 'kakao' && <img src={kakao} alt="logoImg" />}
            {userInfo.domain === 'naver' && <img src={naver} alt="logoImg" />} */}
            <img src={kakao} alt="logoImg" />
            {userInfo.email}
          </LoginInfoContent>
        </LoginInfo>

        <MyTextWrap>
          <div className="MyTextNick">닉네임</div>
          <div className="MyTextInputWrap">
            <input
              type="text"
              placeholder={userInfo.nickname}
              minLength="1"
              maxLength="6"
            />
            <Delete />
          </div>
          {/* <span className="MyTextCheck"></span> */}
        </MyTextWrap>
        <MyDoneBtnWrap>
          <MyDoneBtn type="button" onClick={() => window.history.back()}>
            취소
          </MyDoneBtn>
          <MyDoneBtn type="submit">
            완료
          </MyDoneBtn>
        </MyDoneBtnWrap>
      </MyProfile>

    </Layout>
  );
};

export default MyPageEdit;


const MyProfile = styled.form`
  display: flex;
  flex-direction: column;
  /* margin: 0px 10px 10px 10px; */
  margin: 00px 20px 0px 20px;
`;

const MyImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  margin-top: 40px;
`;


const MyImgBox = styled.div`
  display: flex;
  width: 120px;
  height: 100%;

  img {
    display: flex;
    width: 120px;
    height: 120px;
    border-radius: 120px;
  }
  label {
    display: flex;
    position: absolute;
    top: 175px;
    left: 219px;
    width: 36px;
    height: 36px;
    border-radius: 36px;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    @media screen and (min-width: 425px) and (max-width : 100vw) {
    position: absolute;
    left: calc(50% + 25px);
    transform: translateX(-50%);
  }
  }
`;
const LoginInfo = styled.div`
  width: 100%;
  border-bottom: 1px solid black;

`;
const LoginInfoTitle = styled.h2`
  font: 500 18px/1 "Noto sans", "sans-serif";
`;
const LoginInfoContent = styled.div`
  font: 16px/1 "Noto sans", "sans-serif";
  color: #7b7b7b;
  padding: 20px 0 28px;
  box-sizing: border-box;
  display:flex;
  align-items:center;
  img{
    width:20px;
    margin-right:10px;
  }
`;

const MyTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  .MyTextNick {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
  }
  .MyTextInputWrap {
    display: flex;
    margin-top: 16px;
    width: 100%;
    height: 56px;
    position: relative;
    input {
      width: 100%;
      padding: 17px 30px 14px 9px;
      border-radius: 8px;
      border: 1px solid grey;
      font-size: 18px;
    }
    svg {
      position: absolute;
      top: 19px;
      right: 8px;
      width: 18px;
      height: 18px;
      border-radius: 18px;
      border: none;
      align-items: center;
      justify-content: center;
    }
  }
  .MyTextCheck {
    display: flex;
    margin-top: 12px;
    font-size: 16px;
    font-weight: 300;
    color: #ddd;
  }
`;

const MyDoneBtnWrap = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  margin : 50px 0 100px 0;
`;

const MyDoneBtn = styled.button`
  display: flex;
  width: 100%;
  height: 56px;
  margin : 20px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-color: #3556E1;
  border: none;
  border-radius: 10px;
  color : #fff;
  font-weight : 400;
`;
