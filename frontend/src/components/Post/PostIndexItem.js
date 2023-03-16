import { Link  } from "react-router-dom";
import React from "react";
import PostUpdateDeleteButtons from "./PostUpdateDeleteButtons";

function PostIndexItem ({post}) {
    console.log(post);
    return (
        <>
            <Link to={`/posts/${post.id}`} >
            <h1>Post content goes here {post.id}</h1>
            <div>{post.url}</div>
            <p>{post.content}</p>
            {/* if post creator id equals the sessionUser id then show buttons where you can update or delete             */}
            </Link>

            <PostUpdateDeleteButtons post={post}/>
            

        </>
        )
}

export default PostIndexItem