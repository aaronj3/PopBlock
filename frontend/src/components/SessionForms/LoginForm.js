import { useState } from "react";
import { useDispatch } from "react-redux";
import DemoLogin from "./DemoLogin.js";
import { showSignupModal } from "../../store/ui";
import * as sessionActions from "../../store/session";
import sessionImg from '../../assets/images/popblockmap.png'
import logo from '../../assets/images/logo.png'
import './SessionForms.css'


function LoginForm() {

    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ username, password }))
            .catch(async (res) => {
            let data;
            try {
                // .clone() essentially allows you to read the response body twice
                data = await res.clone().json();
            } catch {
                data = await res.text(); // Will hit this case if the server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        });
    };

    return (
        <>
        <div className="modal-container">
            <div className="left-container">
                <div className="pb-logo-container"><img className="logo1" src={logo}/></div>
                <div className='under-logo-text'>Take over your city!</div>
                <img src={sessionImg} className="sessionImg" alt="img"/>
            </div>
            <div className="right-container">
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map(error => <li key={error} className="error-messages">{error}</li>)}
                    </ul>
                    <div className="form-container">
                        <div className="form-body-container" >
                            <h2 className="modal-CTA-header">Welcome back!</h2>
                            <p className="modal-CTA-subtext">
                                Enter the login credentials associated with your PopBlock account.
                            </p>

                            <label>
                                <input className="form-field"
                                    placeholder='Username'
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </label>

                            <br/>

                            <label>
                                <input className="form-field"
                                    placeholder='Password'
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>

                            <br/>

                            <button className="modal-button" type="submit">Log In</button>

                        </div>
                    </div>
                </form>

                <br></br>

                <DemoLogin/>

                <br></br>

                <div id="alternate-button-container">
                    <button className="alternate-button" onClick={()=>dispatch(showSignupModal())}>Sign Up</button>
                </div>
            </div>
        </div>
        </>
    );
    }

export default LoginForm;
