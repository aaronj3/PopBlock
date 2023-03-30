import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {showLoginModal} from "../../store/ui";
import * as sessionActions from "../../store/session";
import sessionImg from '../../assets/images/popblockmap.png'
import logo from '../../assets/images/logo.png'
import "./SessionForms.css"

//need to import sessionActions from store/session
function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const [first_name, setFirstName] = useState('')
    // const [last_name, setLastName] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
          setErrors([]);
          try {
            const data = await dispatch(sessionActions.signup({ username, password }));
            // console.log("data", data);
            // console.log("data errors", data.errors);
            setErrors(Object.values(data.errors));
            // console.log("Errors", errors);
            return data;
          } catch (err) {
            // console.log("Error", err);
            return setErrors(["An error occurred while signing up"]);
          }
        }
        return setErrors(["Confirm Password field must be the same as the Password field"]);
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

                    <h2 className="modal-CTA-header">Welcome to PopBlock</h2>
                    <p className="modal-CTA-subtext">Create an account.</p>
                    {errors.length > 0 && (
                        <ul className="error-messages">
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                        )}

                    <br/>

                    <label>
                        <input className="form-field"
                        placeholder='Username'
                        type='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required/>
                    </label>

                    <br/>

                    <label>
                        <input className="form-field"
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                    </label>

                    <br/>

                    <label>
                        <input className="form-field"
                            placeholder='Confirm password'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required/>
                    </label>

                    <br/>

                    <button className="modal-button" type='submit'>Sign up</button>
                </form>
                <div id="alternate-button-container">
                    <button className="alternate-button" onClick={()=> dispatch(showLoginModal())}>Log In</button>
                </div>
            </div>
        </div>
        </>
    );
    }

    export default SignupForm;
