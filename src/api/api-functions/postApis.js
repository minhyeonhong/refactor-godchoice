import { hInstance, nhInstance } from "../instance";

export const postApis = {
    //전체글 검색 조회
    searchPostAX: (searchInfo) => hInstance.get(
        `${process.env.REACT_APP_API_URL}/allposts?
            main=${searchInfo.main}
            &tag=${searchInfo.tag}
            &progress=${searchInfo.progress}
            &sort=${searchInfo.sort}
            &search=${searchInfo.search}
            &page=${searchInfo.page}
        `),
    // searchPostAX: (searchInfo) => nhInstance.get(
    //     `${process.env.REACT_APP_API_URL}/allposts`, { params: searchInfo }),
    postListAX: (page) => nhInstance.get(`${process.env.REACT_APP_API_LOCAL_URL}/posts`)
}