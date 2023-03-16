import { useDispatch } from "react-redux";
import { deletePost } from "../../store/posts";


function DeletePostForm({ post , setDeleteModalShow}) {
    const dispatch = useDispatch();

    const handleDeleteButtonClick = (e) => {
        e.preventDefault();
        dispatch(deletePost(post.id))
        setDeleteModalShow(false);
    }

    return (
        <div>
            <button onClick={() => {setDeleteModalShow(false)}}>Nevermind</button>
            <button onClick={(handleDeleteButtonClick)}>Delete Post</button>
        </div>
        )
}

export default DeletePostForm
