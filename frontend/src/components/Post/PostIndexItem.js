import { Link  } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import PostUpdateDeleteButtons from "./PostUpdateDeleteButtons";
import './Post.css'

function PostIndexItem ({post, index}) {
    const isImage = (filename) =>{
        var ext = filename?.split('.').pop().toLowerCase();
        if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif' || ext == 'bmp') {
            return true;
        }
        return false;
    }

    const sessionUser = useSelector(state => state.session.user);
    const rank = index + 1;

    if(!post){
        return null
    } else{
        const imgFlag = isImage(post.url);
        return (
            <div className="post-index-item" style={{ backgroundColor: post.author?.color }}>
                <Link to={`/posts/${post._id}`}>
                    <div className="listshowpage">
                        <div className="postContentContainer">
                            <h1 className="username">#{rank} by {post.author?.username || 'Unknown'}</h1>
                            {imgFlag ? (
                                <img src={post.url} alt='' className="post-media" />
                            ) : (
                                <video src={post.url} controls className="post-media" />
                            )}
                            <h2 className="post-likes">{post.likes && post.likes.length} POPS</h2>

                            <h2 className="post-content">{post.content}</h2>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default PostIndexItem;
