import { useDispatch, useSelector } from "react-redux"
// import { deleteReview } from "../../store/reviews";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import DeletePostForm from "./DeletePostForm"
import UpdatePostForm from "./UpdatePostForm"
import TrashButton from "../../assets/images/trash2.svg"
import EditButton from "../../assets/images/edit2.svg"



function PostUpdateDeleteButtons ({post}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [updateModalShow, setUpdateShowModal] = useState(false);
    if (!sessionUser) return
    if (post.author._id !== sessionUser._id) return

    return (
        <div className="update-delete-buttons-container">
            <button className="update-delete-buttons" onClick={() => setDeleteModalShow(true)}>
                <img className="icon" src={TrashButton}/>
            </button>
            {deleteModalShow && (
                <Modal onClose={() => setDeleteModalShow(false)} size="update-delete">
                    <DeletePostForm post={post} setDeleteModalShow={setDeleteModalShow}/>
                </Modal>
                )}

            <button className="update-delete-buttons" onClick={() => setUpdateShowModal(true)}>
                <img className="icon" src={EditButton}/>
            </button>
            {updateModalShow && (
                <Modal onClose={() => setUpdateShowModal(false)} size="update-delete">
                    <UpdatePostForm post={post} setUpdateShowModal={setUpdateShowModal}/>
                </Modal>
                )}
        </div>
        )
}

export default PostUpdateDeleteButtons;
