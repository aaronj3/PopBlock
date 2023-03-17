import {NavLink, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import LoginFormModal from '../SessionForms/LoginFormModal';
import SignupFormModal from '../SessionForms/SignupFormModal';
import './NavBar.css';
import {logout} from '../../store/session';
import {showLoginModal, showSignupModal} from '../../store/ui';
import ProfileButton from './ProfileButton';
import logo from '../../assets/images/logo.png'


function NavBar () {
    // const loggedIn = useSelector(state => !!state.session.user?.user);
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
                    <button className="button" id="signup-button" onClick={()=>dispatch(showSignupModal())}>
                        Signup
                    </button>

                    <button className="button" id="login-button" onClick={()=>dispatch(showLoginModal())}>
                        Login
                    </button>
                </div>
            );
        }
    }

    return (
        <>
            <ul className={'nav-bar ' + (modal === 'login'? 'z-index' : '')}>
                <div className="nav-container">
                    <li>
                    <NavLink exact to="/"><img className="logo" src={logo}/></NavLink>
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
