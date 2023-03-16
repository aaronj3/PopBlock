import { Link  } from "react-router-dom";
import React from "react";
import PostUpdateDeleteButtons from "./PostUpdateDeleteButtons";

function PostIndexItem ({post}) {
    



    return (
        <>
            <Link to={`/posts/${post.id}`} >
            <h1>Post content goes here</h1>
            <div>{post.url}</div>
            <p>{post.content}</p>
            {/* if post creator id equals the sessionUser id then show buttons where you can update or delete             */}
            </Link>

            <PostUpdateDeleteButtons/>
            

        </>
        )
}

export default PostIndexItem