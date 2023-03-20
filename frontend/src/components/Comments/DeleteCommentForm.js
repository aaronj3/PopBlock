import { useDispatch } from "react-redux";
import { deleteComment, fetchComments } from "../../store/comments";

function DeleteCommentForm({ comment , setDeleteModalShow, postId}) {
    const dispatch = useDispatch();

    const handleDeleteButtonClick = (e) => {
        e.preventDefault();
        dispatch(deleteComment(comment))
        setDeleteModalShow(false);
        dispatch(fetchComments(postId))
    }

    return (
        <div>
            <button onClick={() => {setDeleteModalShow(false)}}>Nevermind</button>
            <button onClick={(handleDeleteButtonClick)}>Delete</button>
        </div>
        )
}

export default DeleteCommentForm
