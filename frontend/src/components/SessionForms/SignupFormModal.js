import React from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import { hideModal } from '../../store/ui';
import { useDispatch } from 'react-redux'

function SignupFormModal() {
    const dispatch = useDispatch();


    return (
        <Modal onClose={() => dispatch(hideModal())}>
            <SignupForm />
        </Modal>
    )
}

export default SignupFormModal;
