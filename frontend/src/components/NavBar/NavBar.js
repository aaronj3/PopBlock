import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormModal from '../SessionForms/LoginFormModal';
import SignupFormModal from '../SessionForms/SignupFormModal';
import './NavBar.css';
import { logout } from '../../store/session';
import { showSignupModal, showLoginModal } from '../../store/ui';
import { Modal } from '../../context/Modal';



function NavBar () {
    const loggedIn = useSelector(state => !!state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const modal = useSelector(state => state.ui.modal)

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
                <div className="links-nav">
                    {/* //CHANGE LINKS.. THIS IS TEMPORARY */}
                    <Link to={'/posts'}>All Posts</Link>
                    <Link to={'/profile'}>Profile</Link>
                    <Link to={'/posts/new'}>Show your moves!</Link>
                    <button onClick={logoutUser}>Logout</button>
                </div>
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
