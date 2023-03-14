import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormModal from '../SessionForms/LoginFormModal';
import SignupFormModal from '../SessionForms/SignupFormModal';
import './NavBar.css';
import { logout } from '../../store/session';
import { showSignupModal, showLoginModal } from '../../store/ui';
import ProfileButton from './ProfileButton';
import { Modal } from '../../context/Modal';



function NavBar () {
    const loggedIn = useSelector(state => !!state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const modal = useSelector(state => state.ui.modal)
    const sessionUser = useSelector(state => state.session.user);

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

    const routeChange = () => {
        let path = "/";
        history.push(path);
    }

    const getLinks = () => {
        if (loggedIn) {
            return (
                <ProfileButton user={sessionUser}/>
            );
        } else {
            return (
                <div className="links-auth">
                    <button onClick={()=>dispatch(showSignupModal())}>
                        Signup
                    </button>

                    <button onClick={()=>dispatch(showLoginModal())}>
                        Login
                    </button>

                </div>
            );
        }
    }

    return (
        <>
            <ul className="nav-bar">
                <div className="nav-container">
                    <li>
                        <div>
                            <button className='logo' onClick={routeChange}>
                                PopBlock
                            </button>
                        </div>

                    </li>
                    <li className="sessionLinks-container" >
                        { getLinks() }
                    </li>
                    </div>
            </ul>
            {modal === 'login' && <LoginFormModal/>}
            {modal === 'signup' && <SignupFormModal/>}
        </>
    );
}

export default NavBar;
