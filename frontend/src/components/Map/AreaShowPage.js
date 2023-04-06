import { useDispatch, useSelector } from "react-redux";
import { getPosts, fetchPosts } from "../../store/posts";
import { useEffect, useState } from "react";
import PostIndexItem from "../Post/PostIndexItem";
import { useParams } from 'react-router-dom';
import FileUpload from "../Post/FileUpload";
import { showLoginModal } from "../../store/ui";
import { Modal } from "../../context/Modal";
import './Map.css';

function AreaShowPage() {
    const { areaId } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);

    const areas = ['App Academy', 'Western Addition', 'West of Twin Peaks', 'Visitacion Valley', 'Twin Peaks', 'South of Market', 'Presidio Heights', 'Presidio', 'Portero Hill', 'Portola', 'Pacific Heights',
                    'Outer Richmond', 'Outer Mission', 'Sunset/Parkside', 'Oceanview/Merced/Ingleside', 'North Beach', 'Noe Valley', 'Lone Mountain/USF', 'Lincoln Park', 'Seacliff', 'Nob Hill',
                    'Mission Bay', 'Mission', 'Russian Hill', 'Marina', 'Lakeshore', 'Tenderloin', 'McLaren Park', 'Japantown', 'Inner Sunset', 'Hayes Valley', 'Haight Ashbury', 'Golden Gate Park',
                    'Inner Richmond', 'Glen Park', 'Financial District/South Beach', 'Excelsior', 'Chinatown', 'Castro/Upper Market', 'Bernal Heights', 'Bayview Hunters Point']
    const areaName = areas[areaId].toUpperCase();

    const[uploadModal, setUploadModal] = useState(false);

    useEffect(()=>{
        dispatch(fetchPosts(areaId))
    }, [dispatch, areaId])

    const handleCancelUpload = () => {
        setUploadModal(false);
        dispatch(fetchPosts(areaId));
    }


    const sessionUser = useSelector(state => state.session.user)


    const handleUpload = async(e) => {
        e.preventDefault();
        setUploadModal(true);
    }
    // console.log('posts in show page', posts)
    if (!posts){
        return null
    }else {
    return (
    <>
        <div id="areaShowPageHeader">
            <h1>WHAT'S POPPIN IN  <span id="areaName">{areaName}</span>?</h1>
            {(sessionUser) ? <button className='uploadButton' onClick={handleUpload}>Upload</button> : <button className='requireLoginButton' onClick={()=>dispatch(showLoginModal())}>Log in to upload</button> }
        </div>

        <div className = "postsIndexContainer">
            {posts.sort((a, b) => b.likes.length - a.likes.length).map((post, index)=> <PostIndexItem index={index} post={post} key={post._id}/>)}
        </div>

        {uploadModal && (
            <Modal onClose={()=>setUploadModal(false)} size="medium">
                <FileUpload area={areaId} onCancel={handleCancelUpload}/>
            </Modal>
        )}
    </>
    )
        }
}

export default AreaShowPage
