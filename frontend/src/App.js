import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/routes/Routes';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import ProfilePage from './components/Profile/ProfilePage';

import { Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <>
      <NavBar/>
      <Switch>
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
