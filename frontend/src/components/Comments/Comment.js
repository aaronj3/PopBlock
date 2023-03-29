import "./Comments.css"
import UpdateDeleteButtons from "./UpdateDeleteButtons";
import {useSelector} from "react-redux";


function Comment({comment, postId}){
    const sessionUser = useSelector(state => state.session.user)

    return (
        <li className="comment-container">
            <section className="commenter-container">
                <div className="commenter-avatar" style={{background: comment.author.color}}>{comment.author.username[0].toUpperCase()}</div>
            </section>
            <section className="comment-body-container">
                <div>
                    <div className="commenter-detail">{comment.author?.username}</div>
                    <span>
                        {comment.body}
                    </span>
                </div>
            </section>
                {sessionUser?._id === comment.author._id ? <UpdateDeleteButtons comment={comment} postId={postId}/> : <></>}
        </li>
        )
}

export default Comment;
