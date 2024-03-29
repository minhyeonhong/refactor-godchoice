import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { FiSearch } from 'react-icons/fi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '../../firestore/module/post';

const Search = ({ searchState, setSearchState, search, searchHandle }) => {

    //const tagList = ['서울', '인천', '세종', '대구', '부산', '울산', '광주', '대전', '제주도', '경기도', '강원도', '충청도', '경상도', '전라도'];

    const result = useInfiniteQuery({
        queryKey: ['postList'],
        queryFn: ({ pageParam }) => getPosts(searchState, pageParam),
        getNextPageParam: ({ isLastPage, lastSnapshot }) => {
            if (!isLastPage) return lastSnapshot;
        },
        refetchOnWindowFocus: false,
    })

    const getTags = result.data?.pages.map(page => page.datas.map(post => post.postAddress.substring(0, 2)));
    const tagList = [...new Set(getTags.reduce((prev, next) => (prev.concat(next))))];

    //진행중 마감 핸들
    const stateHandle = (e) => {
        if (e.target.checked) {
            setSearchState({ ...searchState, progress: "진행중" });
        } else {
            setSearchState({ ...searchState, progress: "마감" });
        }
    }
    //태그 핸들
    const tagHandle = (val, id) => {

        const idx = searchState.tag.indexOf(val);

        if (idx === -1) {
            setSearchState({ ...searchState, tag: [...searchState.tag, val] });
            document.getElementById(id).style.color = "white";
            document.getElementById(id).style.backgroundColor = `#3556E1`;
        } else {
            searchState.tag.splice(idx, 1);
            setSearchState({ ...searchState, tag: [...searchState.tag] });
            document.getElementById(id).style.color = "black";
            document.getElementById(id).style.backgroundColor = `#DCE0F1`;
        }
    }
    //정렬 핸들
    const sortHandle = (e) => {
        setSearchState({ ...searchState, [e.target.name]: e.target.value });
    }

    return (
        <StSearchWrap>
            <StSearchBox>
                <button onClick={() => setSearchState({ ...searchState, search: search.search })}>
                    <FiSearch style={{ width: '24px', height: '24px', color: '#3556E1' }} />
                </button>
                <input name='search' placeholder="검색어를 입력해주세요" value={search.search || ""} onChange={searchHandle}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            setSearchState({ ...searchState, search: search.search })
                        }
                    }} />
            </StSearchBox>
            <StTagBox>
                {searchState.main !== 'ask' &&
                    tagList.map((tag, i) => {
                        return (
                            <button id={`tbg-btn-${i + 1}`} onClick={() => tagHandle(tag, `tbg-btn-${i + 1}`)} key={i}>
                                #{tag}
                            </button>
                        )
                    })}
            </StTagBox>
            <StFilterBox>
                <div>
                    <select name='sort' onChange={sortHandle} style={{ cursor: "pointer" }}>
                        <option value="최신순">최신순</option>
                        <option value="인기순">인기순</option>
                    </select>
                </div>
                <StRadioBox>
                    {searchState.main !== 'ask' &&
                        <>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                checked={searchState.progress === '진행중' ? true : false}
                                onChange={stateHandle}
                            />
                            <label>{searchState.progress}</label>
                        </>
                    }
                </StRadioBox>
            </StFilterBox>
        </StSearchWrap>
    );
};

export default Search;

const StSearchWrap = styled.div`
    height : 140px;    
    display:flex;
    flex-direction: column;
    justify-content : space-evenly
`

const StSearchBox = styled.div`
    background: #E1E3EC;
    border-radius : 30px;
    display : flex;
    flex-direction : row;
    margin : 0px 10px;
    height : 36px;

    input{
        margin-right : 20px;
        width : 100%;
        background-color : transparent;
        border : none;
        border-radius : 0 30px 30px 0;
    }
    input:focus {outline: none;}
    button{
        margin : 0 10px;
        background-color : transparent;
        border : none;
        border-radius :  30px 0 0 30px ;
        
    }`


const StTagBox = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: row;
  margin: 0 10px;
  /* 가로 스크롤 */
  overflow: auto;
  white-space: nowrap;
  gap : 5px;
  button {
    border-radius : 15px;
    border : solid 0px;
    padding : 3px 6px;
    margin-bottom: 5px;
    font-weight: 800;
    background-color : #DCE0F1;
  }
  ::-webkit-scrollbar {
    display: none; 
  }
  @media all and (min-width:769px) {
    ::-webkit-scrollbar {
    display: block; 
    height: 7px;
  }
  ::-webkit-scrollbar-tranck {
    background-color: #e4e4e4;
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb {
    background-color:#dce0f1; /*스크롤바의 색상*/
    border-radius: 50px;
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  }
}

`;

const StFilterBox = styled.div`
    display :flex;
    flex-direction : row;
    margin : 0px 10px;
    justify-content : space-between;
    select {
        width: 75px;
        height: 32px;
        color : white;
        background: #2D4FDA;
        border-radius: 8px;
        border : none;
    }
    select:focus {outline: none;}
`

const StRadioBox = styled.div`
    width : 110px;
    display : flex;
    flex-direction : row;
    align-items : center;
    gap : 10px;
    label {
        font-family : 'Pretendard Variable';
    }
    .form-check-input:checked {
        background-color : #2D4FDA;
    }
    .form-switch .form-check-input {
        width : 52px;
        height : 32px;
        background-image : url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e");
    }
    .form-check-input{
        background-color : #B8C4FF;
        box-shadow : none;
        border : none;
    }
`