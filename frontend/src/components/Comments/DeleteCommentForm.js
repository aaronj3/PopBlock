import { useDispatch } from "react-redux";
import { deleteComment } from "../../store/comments";

function DeleteCommentForm({ comment , setDeleteModalShow}) {
    const dispatch = useDispatch();

    const handleDeleteButtonClick = (e) => {
        e.preventDefault();
        dispatch(deleteComment(comment._id))
        setDeleteModalShow(false);
    }

    return (
        <div>
            <button onClick={() => {setDeleteModalShow(false)}}>Nevermind</button>
            <button onClick={(handleDeleteButtonClick)}>Delete</button>
        </div>
        )
}

export default DeleteCommentForm
