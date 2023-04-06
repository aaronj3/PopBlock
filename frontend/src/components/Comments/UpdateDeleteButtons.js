import "./Comments.css"
import { useSelector } from "react-redux"
import { Modal } from "../../context/Modal";
import { useState } from "react";
import UpdateCommentForm from "./UpdateCommentForm";
import DeleteCommentForm from "./DeleteCommentForm";
import TrashButton from "../../assets/images/trash2.svg"
import EditButton from "../../assets/images/edit2.svg"


function UpdateDeleteButtons ({comment, postId}) {
    const sessionUser = useSelector(state => state.session.user)
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [updateModalShow, setUpdateShowModal] = useState(false);
    if (!sessionUser) return
    if (comment.author._id !== sessionUser._id) return


    return (
        <div className="update-delete-buttons-container">
            <button className='update-delete-buttons' onClick={() => setDeleteModalShow(true)}>
                <img className="icon" src={TrashButton}/>
            </button>
            {deleteModalShow && (
                <Modal onClose={() => setDeleteModalShow(false)} size="update-delete">
                    <DeleteCommentForm comment={comment} setDeleteModalShow={setDeleteModalShow} postId={postId}/>
                </Modal>
                )}

            <button className='update-delete-buttons' onClick={() => setUpdateShowModal(true)}>
                <img className="icon" src={EditButton}/>
            </button>
            {updateModalShow && (
                <Modal onClose={() => setUpdateShowModal(false)} size="update-delete">
                    <UpdateCommentForm comment={comment} setUpdateShowModal={setUpdateShowModal} postId={postId}/>
                </Modal>
                )}
        </div>
        )
}

export default UpdateDeleteButtons;
