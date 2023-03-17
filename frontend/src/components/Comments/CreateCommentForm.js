import "./Comments.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {createComment, fetchComments} from "../../store/comments";
import { useParams } from "react-router-dom";


function CreateCommentForm({postId}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const {postId} = useParams();
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!body) {
            setErrors(["Must fill out all fields"]);
        } else {
            let newComment = {
                post_id: postId,
                body: body
            }
            dispatch(createComment(newComment))
            dispatch(fetchComments(postId))
            setBody("")
        }
    }


    return (
        <div>
            <form onSubmit={(handleSubmit)}>
                <ul>
                    {errors.map(error => <li key={error} className="error-messages">{error}</li>)}
                </ul>

                <label>Comment&nbsp;&nbsp;
                    <input type="textarea" value={body} onChange={(e) => {setBody(e.target.value)}} ></input>
                </label>

                <button>Submit</button>
            </form>
        </div>
        )
}

export default CreateCommentForm
