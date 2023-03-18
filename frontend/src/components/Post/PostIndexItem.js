import { Link  } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import PostUpdateDeleteButtons from "./PostUpdateDeleteButtons";
import './Post.css'

function PostIndexItem ({post}) {
    console.log('post in index item', post);

    const isImage = (filename) =>{
        var ext = filename?.split('.').pop().toLowerCase();
        if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif' || ext == 'bmp') {
            return true;
        }
        return false;
    }
    const sessionUser = useSelector(state => state.session.user);

    // Styling idea - make the background color of the post container the color associated with that user
    if(!post){
        return null
    }else{
        const imgFlag = isImage(post.url);
    return (
        <>
            <Link to={`/posts/${post._id}`}>
            <div className="showpage">
                <div className="postContentContainer">
                    {imgFlag ? (
                        <img src={post.url} height='500px' width='500px' alt=''/>
                    ) : (
                        <video src={post.url} controls width="500px"/>
                    )}
                    <div>{post.content}</div>
                    {sessionUser === post.author ? <PostUpdateDeleteButtons post={post}/> : <></>}
                </div>

            </div>
            </Link>
        </>
        )
    }

    // return (
    //     <>
    //         <Link to={`/posts/${post._id}`} >
    //         <h1>Post content goes here </h1>
    //         <div>{post.url}</div>
    //         <p>{post.content}</p>
    //         {/* if post creator id equals the sessionUser id then show buttons where you can update or delete             */}
    //         </Link>

    //         <PostUpdateDeleteButtons post={post}/>


    //     </>
    //     )
}

export default PostIndexItem
