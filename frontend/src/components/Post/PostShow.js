import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, fetchPost } from "../../store/posts";
import PostUpdateDeleteButtons from "./PostUpdateDeleteButtons";
import Comments from "../Comments/Comments";
import CreateCommentForm from "../Comments/CreateCommentForm";
import { useParams } from "react-router-dom";
import { showLoginModal } from "../../store/ui";
import {fetchComments, getComments} from "../../store/comments";


function PostShow(){
    const dispatch = useDispatch();
    const { postId } = useParams();
    const post = useSelector(getPost(postId));
    const comments = useSelector(getComments)

    console.log('post from post show', post)
    console.log('postid from post show', postId)
    console.log('postid from post show', postId)

    // const pops = post.likes.length ? post.likes.length: 0

    useEffect(()=>{
        dispatch(fetchPost(postId))
        dispatch(fetchComments(postId))
    }, [dispatch, postId])

    const sessionUser = useSelector(state => state.session.user)
    // const [numLikes,setNumLikes]= useState(pops)
    
    const addLike = (e) => {
        e.preventDefault();
        post.likes.append(sessionUser.id)
    }

    const isImage = (filename) =>{
        var ext = filename.split('.').pop().toLowerCase();
        if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif' || ext == 'bmp') {
            return true;
        }
        return false;
    }

    if(!post){
        return null
    }else{
        const imgFlag = isImage(post.url);
    return (
        <>
            hello from post show
            <div className="showpage">

                <div>
                    {imgFlag ? (
                        <img src={post.url} height='500px' width='500px' alt=''/>
                    ) : (
                        <video src={post.url} controls width="500px"/>
                    )}
                </div>
                <div>{post.body}</div>
                <div>
                    {/* <div>{numLikes}</div> */}
                    <button onClick={addLike}></button>
                
                </div>
            </div>
            <div>
                <Comments comments={comments}/>
            </div>

            {(sessionUser) ? <CreateCommentForm postId={postId}/> : <button className='requireLoginButton' onClick={()=>dispatch(showLoginModal())}>Log in to comment</button> }
        
        </>
        )
    }
}

export default PostShow;