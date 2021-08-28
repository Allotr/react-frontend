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
import { CurrentUser, CurrentUserQuery } from "allotr-graphql-schema-types";
import { useQuery } from "@apollo/client";


function App() {
  const { data, error, loading } = useQuery<CurrentUserQuery>(CurrentUser);
  console.log("Data loaded", data, data?.currentUser?._id)
  console.log({ data, error, loading });

  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={Login} />
        {!loading ? <GuardedRoute path='/' auth={data?.currentUser?._id != null} exact component={Home} /> : null}
        <Route path="*" component={NotFound} />
      </Switch>

    </Router>
  );
}



export default App;

