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
    console.log('postid from post show', postId)

    // const pops = post.likes.length ? post.likes.length: 0

    useEffect(()=>{
        dispatch(fetchPost(postId))
    }, [dispatch, postId])

    const sessionUser = useSelector(state => state.session.user)
    // const [numLikes,setNumLikes]= useState(pops)
    
    const addLike = (e) => {
        e.preventDefault();
        post.likes.append(sessionUser.id)

    }



    if(!post){
        return null
    }else{

    
    return (
        <>
            hello from post show
            <div className="showpage">
                <div><img src='https://popblock.s3.us-west-1.amazonaws.com/z6h7x' height='500px' width='500px' alt=''/></div>
                <div>{post.body}</div>
                <div>
                    {/* <div>{numLikes}</div> */}
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