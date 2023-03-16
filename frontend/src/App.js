import {Switch} from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from './components/routes/Routes';

import MainPage from './components/MainPage/MainPage';
import ProfilePage from './components/Profile/ProfilePage';
import Map from './components/Map/Map';

import NavBar from './components/NavBar/NavBar';
import './index.css'
import {useDispatch} from "react-redux";
import {getCurrentUser} from "./store/session";

function App() {
  const dispatch = useDispatch();
  dispatch(getCurrentUser())

  return (
    <>
      <NavBar/>
      <Switch>
      <Map />
        <AuthRoute exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/posts" component={MainPage} />
        <ProtectedRoute exact path="/profile" component={ProfilePage} />
        <ProtectedRoute exact path="/posts/new" component={MainPage} />
        {/* <Route exact path="/" component={MainPage} /> */}
        {/* <AuthRoute exact path="/login" component={LoginForm} /> */}
        {/* <AuthRoute exact path="/signup" component={SignupForm} /> */}
      </Switch>
    </>
  );
}

export default App;
