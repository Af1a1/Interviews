import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import LoginForm from './components/login/LoginForm';
import Users from './components/login/Users';
import GuardedRoute from './components/login/GuardedRoute';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar username={localStorage.getItem('username')} />
        <div className='container my-5'>
          <Switch>
            <Route path='/' exact component={LoginForm} />
            <GuardedRoute
              path='/users'
              exact
              component={Users}
              auth={localStorage.getItem('auth') ? true : false}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
