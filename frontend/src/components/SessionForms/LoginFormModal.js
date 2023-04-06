import React from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import DemoLogin from "./DemoLogin";
import { hideModal } from '../../store/ui';
import { useDispatch } from "react-redux";

function LoginFormModal() {
    const dispatch = useDispatch();

    return (
        <Modal onClose={() => dispatch(hideModal())} size="medium">
            <LoginForm className="auth-form"/>
        </Modal>
    )
}

export default LoginFormModal;
