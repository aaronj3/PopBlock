import { useDispatch } from "react-redux";
import { deleteComment, fetchComments } from "../../store/comments";
import "./Comments.css"

function DeleteCommentForm({ comment, setDeleteModalShow, postId}) {
    const dispatch = useDispatch();
    // console.log(postId)


    const handleDeleteButtonClick = (e) => {
        e.preventDefault();
        dispatch(deleteComment(comment))
        // console.log(comment.postId)
        // console.log(comment.post._id)
        // dispatch(fetchComments(postId))
        setDeleteModalShow(false);
        // dispatch(fetchComments(postId))
    }

    return (
        <div className="comment-CRUD-form">
            <h1 className="comment-form-header">Delete this comment?</h1>
            <div className="options-container">
                <button className="modal-button" onClick={(handleDeleteButtonClick)}>Delete</button>
                <br></br>
                <button className="alternate-button" onClick={() => {setDeleteModalShow(false)}}>Nevermind</button>
            </div>
        </div>
        )
}

export default DeleteCommentForm
