import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPost, getPost, getPostLike, likePost} from "../../store/posts";
import Comments from "../Comments/Comments";
import CreateCommentForm from "../Comments/CreateCommentForm";
import {useParams} from "react-router-dom";
import {showLoginModal} from "../../store/ui";
import {fetchComments, getComments} from "../../store/comments";


function PostShow(){
    const dispatch = useDispatch();
    const { postId } = useParams();
    const post = useSelector(getPost(postId));
    const comments = useSelector(getComments);
    const likes = useSelector(state => {
        return state.posts[postId]?.likes
    });

    useEffect(() => {
        dispatch(fetchPost(postId));
        dispatch(fetchComments(postId));
    }, [dispatch, postId]);

    const sessionUser = useSelector(state => state.session.user);

    const addLike = (e) => {
        dispatch(likePost(post));
    };

    const isImage = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif' || ext === 'bmp') {
            return true;
        }
        return false;
    };

    if (!post) {
        return null;
    } else {
        const imgFlag = isImage(post.url);
        return (
            <>
                hello from post show
                <div className="showpage">
                    <div>
                        {imgFlag ? (
                            <img src={post.url} height='500px' width='500px' alt=''/>
                        ) : (
                            <video src={post.url} controls width="500px"/>
                        )}
                    </div>
                    <div>{post.body}</div>
                    <div>
                        <br/>
                        <div>likes Count:{likes.length}</div>
                        {(sessionUser) ?
                            <button onClick={addLike}>
                            {likes.includes(sessionUser._id)?'UNLIKE':'LIKE'}</button>
                            : ""}
                        <br/>
                        <br/>
                    </div>
                </div>
                <div>
                    <Comments comments={comments}/>
                </div>
                {(sessionUser) ? <CreateCommentForm postId={postId}/> : <button className='requireLoginButton' onClick={()=>dispatch(showLoginModal())}>Log in to comment</button> }
            </>
        );
    }
}

export default PostShow;
