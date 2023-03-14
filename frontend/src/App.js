import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/routes/Routes';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import { Route } from 'react-router-dom';


function App() {
  return (
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      {/* <Route exact path="/" component={MainPage} /> */}
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
    </Switch>
  );
}

export default App;
