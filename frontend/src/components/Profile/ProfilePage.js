import './Profile.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchUserPosts, getPosts} from "../../store/posts";
import {useEffect, useState} from "react";
import PostIndexItem from "../Post/PostIndexItem";
import {fetchComments, getComments} from "../../store/comments";
import {Link} from "react-router-dom";

function ProfilePage() {
    const dispatch = useDispatch();
    const posts = useSelector(getPosts)
    const comments = useSelector(getComments)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            dispatch(fetchUserPosts()),
            dispatch(fetchComments())
        ]).then(() => {
            setLoaded(true);
        });
    },[])

    return (
        <div className={'profile'}>
            <div>
                <h1>Your posts</h1>
                <br/>
                {posts.length > 0 && (
                    posts.map((post)=> <PostIndexItem post={post} key={post.id}/>)
                )}
                {!loaded && (
                    <img src="http://webcreatorbox.com/sample/images/loading.gif"/>
                )}

                {loaded == true && posts.length == 0 && (
                    <span>No Post</span>
                )}
            </div>
            <br/><br/>
            <div className={'comment'}>
                <h1>Your comments</h1>
                <br/>
                {comments.length > 0 && (
                    <ul>
                        {comments.map((comment) => <li> <Link to={`/posts/${comment.post._id}`}>{comment.body}</Link></li>)}
                    </ul>
                )}
                {!loaded && (
                    <img src="http://webcreatorbox.com/sample/images/loading.gif"/>
                )}
                {loaded == true && comments.length == 0 && (
                    <span>No Comment</span>
                )}
            </div>
        </div>
    )
}

export default ProfilePage;
