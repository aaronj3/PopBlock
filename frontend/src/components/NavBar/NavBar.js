import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormModal from '../SessionForms/LoginFormModal';
import SignupFormModal from '../SessionForms/SignupFormModal';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
    const loggedIn = useSelector(state => !!state.session.user);
    const dispatch = useDispatch();

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

    const getLinks = () => {
        if (loggedIn) {
            return (
                <div className="links-nav">
                    //CHANGE LINKS.. THIS IS TEMPORARY
                    <Link to={'/posts'}>All Posts</Link>
                    <Link to={'/profile'}>Profile</Link>
                    <Link to={'/posts/new'}>Show your moves!</Link>
                    <button onClick={logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className="links-auth">
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            );
        }
    }

    return (
        <>
            <h1>PopBlock</h1>
            { getLinks() }
            {modal === 'login' && <LoginFormModal/>}
            {modal === 'signup' && <SignupFormModal/>}
        </>
    );
}

export default NavBar;
