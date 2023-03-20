import { useDispatch } from "react-redux";
import { updateComment } from "../../store/comments";
import { useState } from "react";

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
            console.log(newComment)
            dispatch(updateComment(newComment))
            setUpdateShowModal(false);
        }
    }

    return (
        <div>
            <form onSubmit={(handleUpdateSubmit)}>
                <ul>
                    {errors.map(error => <li key={error} className="error-messages">{error}</li>)}
                </ul>
                <label>Body
                    <input type="textarea" value={body} onChange={(e) => {setBody(e.target.value)}} ></input>
                </label>

                <button>Submit</button>
            </form>

        </div>
        )
}

export default UpdateCommentForm
