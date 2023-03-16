import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/session';

import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/routes/Routes';

import MainPage from './components/MainPage/MainPage';
import ProfilePage from './components/Profile/ProfilePage';

import { Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import './index.css'

function App() {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);



  return loaded && (
    <>
      <NavBar/>
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/posts" component={MainPage} />
        <ProtectedRoute exact path="/profile" component={ProfilePage} />
        <ProtectedRoute exact path="/posts/new" component={MainPage} />
        {/* <Route exact path="/area/areaId" component={AreaPage} /> */}
        {/* <AuthRoute exact path="/login" component={LoginForm} /> */}
        {/* <AuthRoute exact path="/signup" component={SignupForm} /> */}
      </Switch>
    </>
  );
}

export default App;
