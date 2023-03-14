import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { showLoginModal } from "../../store/ui";
import * as sessionActions from "../../store/session";


//need to import sessionActions from store/session


function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ first_name, last_name, email, password }))
            .catch(async (res) => {
            let data;
            try {
                data = await res.clone().json();
            } catch {
                data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    // const changeModal = (e) => {

    // }


    return (
            <>
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map(error=> <li key={error}>{error}</li>)}
            </ul>

            <h2 className="modal-CTA-header">Make an account</h2>

            <label className>
                <input className="form-field"
                placeholder='First name'
                type='text'
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required/>
            </label>

            <br/>

            <label>
                <input className="form-field"
                placeholder='Last name'
                type='text'
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required/>
            </label>

            <br/>

            <label>
                <input className="form-field"
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

        </>
    );
    }

    export default SignupForm;
