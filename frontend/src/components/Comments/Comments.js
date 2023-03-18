import Comment from "./Comment"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import "./Comments.css"
import CreateCommentForm from "./CreateCommentForm";
import { fetchComments } from "../../store/comments";
import { useEffect } from "react";


function Comments({comments}) {
    const dispatch = useDispatch();
    // const comments = useSelector(state => Object.values(state.comments));
    const { postId } = useParams();

    useEffect(()=> {
        dispatch(fetchComments(postId))
    }, [dispatch, postId])

    if (comments.length == 0) {
        return null
    }

    return (
        <>
            <header className="profile-section-container">
                <header className="section-header">
                    <div className="comment-header">
                        <h2 className="header-text">What {comments.length} people are saying</h2>
                    </div>
                </header>
            </header>

            {/*<CreateCommentForm/>

            <br></br>*/}

            <ol className="comments-list" id="restProfilecommentsContent">
                {comments.map(comment=><Comment key={comment._id} comment={comment}/>)}
            </ol>
        </>
        )
    }


export default Comments
