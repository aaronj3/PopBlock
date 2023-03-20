import "./Comments.css"
import { useSelector } from "react-redux"
import { Modal } from "../../context/Modal";
import { useState } from "react";
import UpdateCommentForm from "./UpdateCommentForm";
import DeleteCommentForm from "./DeleteCommentForm";


function UpdateDeleteButtons ({comment, postId}) {
    const sessionUser = useSelector(state => state.session.user)
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [updateModalShow, setUpdateShowModal] = useState(false);
    if (!sessionUser) return
    if (comment.author._id !== sessionUser._id) return


    return (
        <div>
            <button onClick={() => setDeleteModalShow(true)}>Delete</button>
            {deleteModalShow && (
                <Modal onClose={() => setDeleteModalShow(false)}>
                    <DeleteCommentForm comment={comment} setDeleteModalShow={setDeleteModalShow} postId={postId}/>
                </Modal>
                )}

            <button onClick={() => setUpdateShowModal(true)}>Update</button>
            {updateModalShow && (
                <Modal onClose={() => setUpdateShowModal(false)}>
                    <UpdateCommentForm comment={comment} setUpdateShowModal={setUpdateShowModal} postId={postId}/>
                </Modal>
                )}
        </div>
        )
}

export default UpdateDeleteButtons;
