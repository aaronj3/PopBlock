import "./Comments.css"
import UpdateDeleteButtons from "./UpdateDeleteButtons";
import {useSelector} from "react-redux";


function Comment({comment}){
    const sessionUser = useSelector(state => state.session.user)
    return (
        <li className="comment-container">
            <section className="commenter-container">
                <div className="commenter-avatar">??</div>
                <p className="commenter-detail">{comment.author?.username}</p>
                {sessionUser?._id !== comment.author._id ? <UpdateDeleteButtons comment={comment}/> : <></>}
            </section>
            <section className="comment-body-container">

                <div>
                    <span>
                        {comment.body}
                    </span>
                </div>
            </section>
        </li>
        )
}

export default Comment;
