import Comment from "./Comment"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import "./Comments.css"
import CreateCommentForm from "./CreateCommentForm";
import { fetchComments, getComments } from "../../store/comments";
import { useEffect } from "react";


function Comments({comments}) {
    const dispatch = useDispatch();
    const { postId } = useParams();


    useEffect(()=> {
        // console.log(comments.length)
        // console.log(postId)
        dispatch(fetchComments(postId))
    }, [dispatch, postId, comments.length])

    // if (comments.length == 0) {
    //     return null
    // }

    return (
        <>
            <header className="profile-section-container">
                <header className="section-header">
                    <div className="comment-header">
                        {comments.length === 0 ?
                        (<h2 className="header-text"></h2>
                        ) : (<h2 className="header-text">What {comments.length} people are saying</h2>)}
                    </div>
                </header>
            </header>


            <ol className="comments-list" id="restProfilecommentsContent">
                {comments.map(comment=><Comment key={comment._id} comment={comment} postId={postId}/>)}
            </ol>
        </>
        )
    }


export default Comments
