import { useDispatch } from "react-redux";
import { deletePost } from "../../store/posts";
import { useHistory } from "react-router-dom";



function DeletePostForm({ post , setDeleteModalShow}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDeleteButtonClick = (e) => {
        e.preventDefault();
        dispatch(deletePost(post._id))
        setDeleteModalShow(false);
        history.push(`/posts/area/${post.area}`)
    }

    return (
        <div>
            <button onClick={() => {setDeleteModalShow(false)}}>Nevermind</button>
            <button onClick={(handleDeleteButtonClick)}>Delete Post</button>
        </div>
        )
}

export default DeletePostForm
