import { useDispatch, useSelector } from "react-redux";
import { getPosts, fetchPosts } from "../../store/posts";
import { useEffect, useState } from "react";
import PostIndexItem from "../Post/PostIndexItem";
import { useParams } from 'react-router-dom';
import FileUpload from "../Post/FileUpload";
import { showLoginModal } from "../../store/ui";
import { Modal } from "../../context/Modal";



function AreaShowPage() {
    const {areaId} = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);
    console.log(posts)


    const[uploadModal, setUploadModal] = useState(false);

    useEffect(()=>{
        dispatch(fetchPosts(areaId))
    }, [dispatch, areaId])

    // const allposts = posts.slice(0);
    // console.log('allposts', allposts)

    const sessionUser = useSelector(state => state.session.user)

    
    const handleUpload = async(e) => {
        e.preventDefault();
        setUploadModal(true);
    }
    console.log('posts in show page', posts)
    if (!posts|| posts.length===0){
        return null
    }else {
    return (
    <>
        Hi Hello from area show page
        
        {(sessionUser) ? <button className='uploadButton' onClick={handleUpload}>Upload</button> : <button className='requireLoginButton' onClick={()=>dispatch(showLoginModal())}>Log in to upload</button> }
        {posts[0].map((post)=> <PostIndexItem post={post} key={post.id}/>)}
        {uploadModal && (
            <Modal onClose={()=>setUploadModal(false)}>
                <FileUpload area={areaId} />
            </Modal>
        )}
    </>      
    )
        }
}

export default AreaShowPage
    