import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/session';

import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/routes/Routes';

import MainPage from './components/MainPage/MainPage';
import ProfilePage from './components/Profile/ProfilePage';
import Map from './components/Map/Map';

import { Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import './index.css'
import AreaShowPage from './components/Map/AreaShowPage';
import PostShow from './components/Post/PostShow';
import AboutUsPage from './components/MainPage/AboutUs';
import { Modal } from './context/Modal';

function App() {
  const [showAboutUs, setShowAboutUs] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);


  return loaded && (
    <>
      <div className="background">
      <NavBar/>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/posts/area/:areaId" component={AreaShowPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/posts/new" component={MainPage} />
        <Route exact path="/posts/:postId" component={PostShow} />
        {/* <AuthRoute exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/posts/:areaId" component={AreaShowPage} />
        <ProtectedRoute exact path="/profile" component={ProfilePage} />
        <ProtectedRoute exact path="/posts/new" component={MainPage} /> */}
        {/* <Route exact path="/area/areaId" component={AreaPage} /> */}
        {/* <AuthRoute exact path="/login" component={LoginForm} /> */}
        {/* <AuthRoute exact path="/signup" component={SignupForm} /> */}
      </Switch>
      <footer className="footer">
            <div>
                Copyright &copy; 2023 PopBlock
            </div>
            <div>
            <a className="about-links"href="https://github.com/aaronj3/PopBlock" target="_blank">Github</a>
            </div>
            <div>
                <button className="meet-the-team" onClick={()=>setShowAboutUs(true)}>
                    Meet the team
                </button>
                {showAboutUs && (
                <Modal id="meet-the-team-modal" size="medium" onClose={()=> setShowAboutUs(false)}>
                    <AboutUsPage/>
                </Modal>
                    )}
            </div>
        </footer>
      </div>
    </>
  );
}

export default App;
