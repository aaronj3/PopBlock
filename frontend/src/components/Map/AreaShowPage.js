import { useDispatch, useSelector } from "react-redux";
import { getPosts, fetchPosts } from "../../store/post";
import { useEffect } from "react";
import PostIndexItem from "../Post/PostIndexItem";
import { useParams } from 'react-router-dom';
import FileUpload from "../Post/FileUpload";



function AreaShowPage() {
    const {areaId} = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);


    useEffect(()=>{
        dispatch(fetchPosts(areaId))
    }, [dispatch, areaId])

    return (
    <>
        Hi Hello from area show page
        <FileUpload area={areaId}/>
        {posts.map((post)=> <PostIndexItem post={post} key={post.id}/>)}
    </>      
    )
}

export default AreaShowPage
    
