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
        <div>
            <form onSubmit={handleUpdateSubmit}>
                <ul>
                    {errors.map(error => <li key={error} className="error-messages">{error}</li>)}
                </ul>
                <label>Description
                    <input type="textarea" value={content} onChange={(e) => {setContent(e.target.value)}} ></input>
                </label>

                <button>Submit</button>
            </form>

        </div>
        )
}

export default UpdatePostForm
