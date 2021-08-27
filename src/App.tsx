import './App.css';
// import CounterParent from './components/CounterParent';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from './components/generic/NotFound';
import Home from './components/home/Home';
import Login from './components/login/Login';
import GuardedRoute from './components/generic/GuardedRoute';

const isLoggedIn = (): boolean => {
  // if (to.meta.auth) {
  //   if (getIsLoggedIn()) {
  //     next();
  //   }
  return false;
  // } else {
  //   next();
  // }
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'  exact component={Login} />
        <GuardedRoute path='/' auth={isLoggedIn()} exact component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>

    </Router>
  );
}



export default App;
