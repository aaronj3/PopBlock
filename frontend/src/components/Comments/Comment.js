import "./Comments.css"
import UpdateDeleteButtons from "./UpdateDeleteButtons";


function Comment({comment}){

    return (
        <li className="comment-container">
            <section className="commenter-container">
                <div className="commenter-avatar">??</div>
                <p className="commenter-detail">commenter name</p>
                <UpdateDeleteButtons comment={comment}/>
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
