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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const data = await dispatch(sessionActions.login({ username, password }));
            console.log("data", data);
            console.log("data errors", data.errors);
            setErrors(Object.values(data.errors));
            console.log("Errors", errors);
            return data;
          } catch (err) {
            // console.log("Error", err);
            return setErrors(["Invalid credentials!!!"]);
          }
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
                    <div className="form-container">
                        <div className="form-body-container" >
                            <h2 className="modal-CTA-header">Welcome back!</h2>
                            <p className="modal-CTA-subtext">
                                Enter the login credentials associated with your PopBlock account.
                            </p>
                            {errors.length > 0 && (
                                <ul className="error-messages">
                                    {errors.map(error => <li key={error}>{error}</li>)}
                                </ul>
                                )}
                            <br/>
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
