import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";
import { BookmarkFill, Views } from "../../assets";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import PageState from "../common/PageState";
import { getPosts } from "../../firestore/module/post";


const MyPost = () => {
  const navigate = useNavigate();

  const [categoryTab, setCategoryTab] = useState("event");

  const [ref, inView] = useInView();

  const result = useInfiniteQuery({
    queryKey: ['postList'],
    queryFn: ({ pageParam }) => getPosts("", pageParam),
    getNextPageParam: ({ isLastPage, lastSnapshot }) => {
      if (!isLastPage) return lastSnapshot;
    },
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니고 다음페이지가 있다면
    if (inView && !result.isFetching && result.hasNextPage) {
      result.fetchNextPage();
    }
  }, [inView, result.isFetching])

  const onClickCategory = (tab) => {
    setCategoryTab(tab);
  };

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

              <PageState display={result.data?.pages[0].datas.length === 0 ? 'flex' : 'none'} state='notFound' imgWidth='25%' height='60vh'
                text='리스트가 존재하지 않습니다.' />
              {result.data?.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.datas
                    .filter(post => (
                      post.contentType === categoryTab
                    ))
                    .filter(post => (
                      localStorage.getItem('uid') === post.writer
                    ))
                    .map(post => (
                      <ListBox
                        key={post.postID}
                        onClick={() =>
                          navigate(`/${post.contentType}/${post.postID}`)
                        }
                      >
                        <ItemImg bgImg={post.photoURIs[0] || `${process.env.PUBLIC_URL}/No_Image_Available.jpg`}>
                          {post.scrapUsers.includes(localStorage.getItem('uid')) &&
                            <BookmarkFill style={{ margin: '4px 0 0 4px' }} />
                          }
                        </ItemImg>
                        <ItemContainer>
                          <ItemTop>
                            <p style={{ fontWeight: 600, fontSize: "20px" }}>{post.title.length > 10 ? post.title.substring(0, 14) + '...' : post.title}</p>
                            <p>{post.category}</p>
                            <p>{post.content}</p>
                          </ItemTop>
                          <ItemBottom>
                            {post.contentType === "event" && <p>{post.endPeriod}</p>}
                            {post.contentType === "gather" && <p>{post.dateToMeet}</p>}
                            {post.contentType === "ask" && <p>{post.writeTime.split(" ")[0]}</p>}
                            <p> <Views style={{ height: "19px" }} /> {post.viewUsers.length}</p>
                          </ItemBottom>
                        </ItemContainer>
                      </ListBox>
                    ))
                  }
                </Fragment>
              ))}
              <PageState
                display={result.isFetching ? 'flex' : 'none'}
                state='notFound'
                imgWidth='25%'
                height=''
                flexDirection='row'
                text='검색중...' />
              {
                result.hasNextPage && <div ref={ref} />
              }
            </>
          </CategoryInfoList>
        </Container>
      </CateWrap>
    </>
  )
}

export default MyPost;



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
  /* @media (max-width: 375px) {
    width: 125px;
    height: 150px;
  }
  @media (max-width: 299px) {
    width: 100px;
    height: 125px;
  } */
`;
const ListBox = styled.div`
  height: 154px;
  margin-bottom : 5px;
  background-color : #fff;
  cursor: pointer;
  padding:  10px;
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
    line-height: 1.4;
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