import { useDispatch } from "react-redux";
import { useState } from "react";
import { updatePost } from "../../store/posts";


function UpdatePostForm({ post , setUpdateShowModal}) {
    const dispatch = useDispatch();
    const [content, setContent] = useState(post.content);
    const [errors, setErrors] = useState([]);


    const handleUpdateSubmit = (e) => {
        console.log("handle update being logged")
        e.preventDefault();
        if (!content) {
            console.log("error??")
            setErrors(["Must fill out all fields"]);
        } else {
            console.log("found the post!!")
            let newPost = {
                ...post,
                content: content
            }
            dispatch(updatePost(newPost))
            setUpdateShowModal(false);
        }
    }

    return (
        <div className="comment-CRUD-form">
            <form className="comment-CRUD-form" onSubmit={handleUpdateSubmit}>
                <h2>Caption:</h2>
                <ul>
                    {errors.map(error => <li key={error} className="error-messages">{error}</li>)}
                </ul>
                <br></br>
                <label>
                    <input type="textarea" value={content} onChange={(e) => {setContent(e.target.value)}} ></input>
                </label>
                <br></br>

                <button className="modal-button">Submit</button>
            </form>

        </div>
        )
}

export default UpdatePostForm
