import React from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import DemoLogin from "./DemoLogin.Js";
import { hideModal } from '../../store/ui';

function LoginFormModal() {
    const dispatch = useDispatch();


    return (
        <Modal onClose={() => dispatch(hideModal())}>
            <LoginForm />
        </Modal>
    )
}

export default LoginFormModal;
