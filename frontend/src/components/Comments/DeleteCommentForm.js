import { useDispatch } from "react-redux";
import { deleteComment, fetchComments } from "../../store/comments";

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
        <div>
            <button onClick={() => {setDeleteModalShow(false)}}>Nevermind</button>
            <button onClick={(handleDeleteButtonClick)}>Delete</button>
        </div>
        )
}

export default DeleteCommentForm
