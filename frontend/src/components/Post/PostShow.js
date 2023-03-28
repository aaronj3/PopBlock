import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPost, getPost, likePost} from "../../store/posts";
import Comments from "../Comments/Comments";
import CreateCommentForm from "../Comments/CreateCommentForm";
import {useParams} from "react-router-dom";
import {showLoginModal} from "../../store/ui";
import {fetchComments, getComments} from "../../store/comments";
import {useState} from "react";
import PostUpdateDeleteButtons from "./PostUpdateDeleteButtons";
import './Post.css'


function PostShow(){
    const dispatch = useDispatch();
    const { postId } = useParams();
    const post = useSelector(getPost(postId));
    const comments = useSelector(getComments);
    const [clicked, setClicked] = useState(false);
    const [animationStyle, setAnimationStyle] = useState({});


      const handlePopClick = () => {
        setClicked(true);
        setAnimationStyle({ animation: 'roll 1s ease-in-out' });
        dispatch(likePost(post));
      };

      const resetAnimation = () => {
        setAnimationStyle({});
      };



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
                <div className="showpage">

                    <div className='media-container'>

                        {imgFlag ? (
                            <img src={post.url} height='500px' width='500px' alt=''/>
                        ) : (
                            <video src={post.url} controls width="500px"/>
                        )}
                    </div>

                    <div className='content-info-container'>
                        <br/>
                        <h1>{post.content}</h1>
                        <h2>{post.author.username}</h2>
                        <img src="https://s.pinimg.com/webapp/love-c31e0b8d.svg"/>
                        {/* <img src="https://s.pinimg.com/webapp/goodIdea-b770896d.svg"/> */}
                        {/* <img src="https://s.pinimg.com/webapp/wow-3cb697ef.svg"/> */}
                        <h2>{likes.length}</h2>

                        <div>
                            <PostUpdateDeleteButtons post={post}/>
                                Pops: {likes.length} &nbsp;&nbsp;
                                {(sessionUser) ?
                                    <button
                                    id="pop-button"
                                    style={animationStyle}
                                    onClick={handlePopClick}
                                    onAnimationEnd={resetAnimation}>
                                        <img src="https://s.pinimg.com/webapp/heartOutline-1f1b1ac2.svg"/>
                                        {likes.includes(sessionUser._id) ? "UNPOP" : "POP"}
                                    </button>
                                : ""}
                        </div>
                        <br/>
                        <br/>
                    </div>
                </div>
                <div>
                    <Comments comments={comments}/>
                    {(sessionUser) ? <CreateCommentForm postId={postId}/> : <button className='requireLoginButton' onClick={()=>dispatch(showLoginModal())}>Log in to comment</button> }
                </div>
            </>
        );
    }
}

export default PostShow;
