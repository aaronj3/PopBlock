import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";



function DemoLogin() {
    const dispatch = useDispatch();

    //we need to seed a demo account
    const [username, useUsername] = useState("demo-user");
    const [password, usePassword] = useState("password")

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    }

    return (
        <form onSubmit={handleLogin}>
            <button className = "modal-button" type="submit">Login with a demo account</button>
        </form>
        )
}

export default DemoLogin;
