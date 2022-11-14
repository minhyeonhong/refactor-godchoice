import React, {useState} from 'react';
import Layout from '../components/layout/Layout';
import Form from 'react-bootstrap/Form';
import FestivalPost from '../components/post/FestivalPost';
import GatherPost from '../components/post/GatherPost';

const Post = () => {

    // 모집 구분글
    const [option, setOption] = useState();

    return (
        <Layout>
            <div>
                <Form.Select aria-label="Default select example" style={{width :"250px"}}
                value="option" onChange={(e)=>setOption(e.target.value)}>
                    <option>모집 구분</option>
                    <option value="행사글">행사글</option>
                    <option value="모집글">모집글</option>
                </Form.Select>
             
                {option==="행사글" && (<FestivalPost />)}
                {option==="모집글" &&(<GatherPost />)}      
            </div>
        </Layout>
    );
};

export default Post;