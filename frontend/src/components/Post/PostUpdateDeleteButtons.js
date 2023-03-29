import { useDispatch, useSelector } from "react-redux"
// import { deleteReview } from "../../store/reviews";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import DeletePostForm from "./DeletePostForm"
import UpdatePostForm from "./UpdatePostForm"



function PostUpdateDeleteButtons ({post}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [updateModalShow, setUpdateShowModal] = useState(false);
    if (!sessionUser) return
    if (post.author._id !== sessionUser._id) return

    return (
        <div>
            <button onClick={() => setDeleteModalShow(true)}>
                Delete
            </button>
            {deleteModalShow && (
                <Modal onClose={() => setDeleteModalShow(false)}>
                    <DeletePostForm post={post} setDeleteModalShow={setDeleteModalShow}/>
                </Modal>
                )}

            <button onClick={() => setUpdateShowModal(true)}>Fuck</button>
            {updateModalShow && (
                <Modal onClose={() => setUpdateShowModal(false)}>
                    <UpdatePostForm post={post} setUpdateShowModal={setUpdateShowModal}/>
                </Modal>
                )}
        </div>
        )
}

export default PostUpdateDeleteButtons;
