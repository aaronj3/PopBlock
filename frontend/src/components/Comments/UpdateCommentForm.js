import { useDispatch } from "react-redux";
import { updateComment } from "../../store/comments";
import { useState } from "react";
import { fetchComments } from "../../store/comments";

function UpdateCommentForm({ comment , setUpdateShowModal}) {
    const dispatch = useDispatch();

    const [body, setBody] = useState(comment.body);
    const [errors, setErrors] = useState([]);


    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (!body) {
            setErrors(["Must fill out all fields"]);
        } else {
            let newComment = {
                ...comment,
                body: body
            }
            dispatch(updateComment(newComment))
            // dispatch(fetchComments(comment.post._id))
            setUpdateShowModal(false);
        }
    }

    return (
        <div className="comment-CRUD-form">
            <h1 className="comment-form-header">Edit comment</h1>
            <form className="comment-CRUD-form" onSubmit={(handleUpdateSubmit)}>
                <ul>
                    {errors.map(error => <li key={error} className="error-messages">{error}</li>)}
                </ul>
                <label>
                    <input type="textarea" value={body} onChange={(e) => {setBody(e.target.value)}} ></input>
                </label>
                <br></br>
                <button className="modal-button" >Submit</button>
            </form>

        </div>
        )
}

export default UpdateCommentForm
