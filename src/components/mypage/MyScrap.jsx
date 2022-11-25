import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BookmarkFill, Image, Views } from "../../assets";
import { saveCategory, __getMyScrap } from "../../redux/modules/myPageSlice";
import Button from "../elements/Button";
// import noImg from "../../assets/images/common/noImg.png"

import { __postScrap } from "../../redux/modules/postSlice";
import PostScrap from "../detail/PostScrap";



const MyScrap = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categoryTab, setCategoryTab] = useState("event");
  useEffect(() => {
    dispatch(__getMyScrap());
    setCategoryTab(saveCategoryTab);
  }, []);

  const { myScrapList } = useSelector((state) => state.myPage);

  const onClickCategory = (tab) => {
    setCategoryTab(tab);
    dispatch(saveCategory(tab));
  };

  const { saveCategoryTab } = useSelector((state) => state.myPage);
  const { eventPost, gatherPost, askPost } = myScrapList


  return (
    <>
      <CateWrap>
        <Container>
          <CategoryBox>
            <Button
              btnType="tabMenu"
              onClick={() => {
                onClickCategory("event");
              }}
              active={categoryTab}
              name="event"
            >
              행사글
            </Button>
            <Button
              btnType="tabMenu"
              onClick={() => {
                onClickCategory("gather");
              }}
              active={categoryTab}
              name="gather"
            >
              모집글
            </Button>
            <Button
              btnType="tabMenu"
              onClick={() => {
                onClickCategory("ask");
              }}
              active={categoryTab}
              name="ask"
            >
              질문글
            </Button>
          </CategoryBox>

          <CategoryInfoList>
            <>
              {categoryTab === "event"
                ? eventPost &&
                eventPost.map((v) => (
                  <ListBox
                    key={v.postId}
                    onClick={() => navigate(`/eventposts/${v.postId}`)}
                  >
                    <ItemImg bgImg={v.imgUrl}>
                      {v.bookMarkStatus &&
                        <BookmarkFill style={{ margin: '4px 0 0 4px' }} />
                      }
                      {/* <PostScrap bookMarkStatus={v.bookMarkStatus} /> */}
                    </ItemImg>
                    <ItemContainer>
                      <ItemTop>
                        <p style={{ fontWeight: 500, fontSize: "20px" }}>{v.title}</p>
                        <p>{v.category}</p>
                        <p>{v.content}</p>
                      </ItemTop>
                      <ItemBottom>
                        <p>~ {v.endPeriod}</p>
                        <p> <Views style={{ height: "19px" }} /> {v.viewCount}</p>
                      </ItemBottom>
                    </ItemContainer>
                  </ListBox>
                ))
                : categoryTab === "gather"
                  ? gatherPost &&
                  gatherPost.map((v) => (
                    <ListBox
                      key={v.postId}
                      onClick={() => navigate(`/gatherposts/${v.postId}`)}
                    >
                      <ItemImg bgImg={v.imgUrl}>
                        {v.bookMarkStatus &&
                          <BookmarkFill style={{ margin: '4px 0 0 4px' }} />
                        }
                        {/* <PostScrap bookMarkStatus={v.bookMarkStatus} /> */}
                      </ItemImg>
                      <ItemContainer>
                        <ItemTop>
                          <p style={{ fontWeight: 500, fontSize: "20px" }}>{v.title}</p>
                          <p>{v.category}</p>
                          <p>{v.content}</p>
                        </ItemTop>
                        <ItemBottom>
                          <p>~ {v.endPeriod}</p>
                          <p> <Views style={{ height: "19px" }} /> {v.viewCount}</p>
                        </ItemBottom>
                      </ItemContainer>
                    </ListBox>
                  ))
                  : askPost &&
                  askPost.map((v) => (
                    <ListBox
                      key={v.postId}
                      onClick={() => navigate(`/askposts/${v.postId}`)}
                    >
                      {/* <ItemImg
                        bgImg={
                          v.imgUrl !== null
                            ? v.imgUrl
                            :<img src={noImg} alt="noImg" />
                        }
                      ></ItemImg> */}
                      <ItemImg bgImg={v.imgUrl}>
                        {v.bookMarkStatus &&
                          <BookmarkFill style={{ margin: '4px 0 0 4px' }} />
                        }
                        {/* <PostScrap bookMarkStatus={v.bookMarkStatus} /> */}
                      </ItemImg>
                      <ItemContainer>
                        <ItemTop style={{ marginBottom: "20px" }}>
                          <p style={{ fontWeight: 500, fontSize: "20px" }}>{v.title}</p>
                          <p>{v.category}</p>
                          <p>{v.content}</p>
                        </ItemTop>
                        <ItemBottom>
                          <p>{v.endPeriod}</p>
                          <p> <Views style={{ height: "19px" }} /> {v.viewCount}</p>
                        </ItemBottom>
                      </ItemContainer>
                    </ListBox>
                  ))}
            </>
          </CategoryInfoList>
        </Container>
      </CateWrap>
    </>
  );
}

export default MyScrap;



const CateWrap = styled.div`
  width: 100%;
`;
const Container = styled.div`
  width: 100%;
`;

const CategoryBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const CategoryInfoList = styled.div`
  width: 100%;
`;

const ItemImg = styled.div`
  position: relative;
  background: url(${(props) => props.bgImg}) no-repeat center center;
  background-size: cover;
  width: 130px;
  height: 130px;
  padding: 3px;
  border-radius : 20px;
  @media (max-width: 375px) {
    width: 125px;
    height: 150px;
  }
  @media (max-width: 299px) {
    width: 100px;
    height: 125px;
  }
`;


const ListBox = styled.div`
  height: 154px;
  margin : 5px auto ;
  background-color : #fff;
  cursor: pointer;
  padding: 23px 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f3f3f3;
  gap : 15px;
`;

const ItemContainer = styled.div`
  flex : 4;
  padding : 5px;
  box-sizing : border-box;
`

const ItemTop = styled.div`
  margin-bottom : 5px;
  p {
    font-size : 16px;
    line-height: 1.5;
    font-weight: 400;
  }
`
const ItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 0.7px solid #8B909F;
  color : #8B909F;
  p { font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  margin-top : 5px;}
 
`