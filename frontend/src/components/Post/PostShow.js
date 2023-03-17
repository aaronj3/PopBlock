import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, fetchPost } from "../../store/posts";
import PostUpdateDeleteButtons from "./PostUpdateDeleteButtons";
import Comments from "../Comments/Comments";
import CreateCommentForm from "../Comments/CreateCommentForm";
import { useParams } from "react-router-dom";
import { showLoginModal } from "../../store/ui";


function PostShow(){
    const dispatch = useDispatch();
    const { postId } = useParams();
    const post = useSelector(getPost(postId));

    console.log('post from post show', post)
    console.log('postid from post show', postId)


    useEffect(()=>{
        dispatch(fetchPost(postId))
    }, [dispatch, postId])

    const sessionUser = useSelector(state => state.session.user)
    const [likes,setLikes]= useState(post.likes.length ? post.likes.length: 0)
    
    const addLike = (e) => {
        e.preventDefault();
        setLikes(likes+1)

    }



    if(!post){
        return null
    }else{

    
    return (
        <>
            hello from post show
            <div className="showpage">
                <div>{post.url}</div>
                <div>{post.body}</div>
                <div>
                    <div>{likes}</div>
                    <button onClick={addLike}></button>
                
                </div>
                <div>
                    <Comments/>
                </div>
            </div>
            {(sessionUser) ? <CreateCommentForm postId={postId}/> : <button className='requireLoginButton' onClick={()=>dispatch(showLoginModal())}>Log in to comment</button> }
            
        
        </>
        )
    }
}

export default PostShow;