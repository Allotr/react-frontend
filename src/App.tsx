import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingScreen from './components/generic/LoadingScreen';
import Home from './components/home/Home';
import Login from './components/login/Login';
import GuardedRoute from './components/generic/GuardedRoute';
import { CurrentUser, CurrentUserQuery } from "allotr-graphql-schema-types";
import { useQuery } from "@apollo/client";
import { CURRENT_USER_DATA } from './consts/global_session_keys';
import { setSessionValue } from './utils/storage-utils';
import CreateResource from './components/resource/CreateResource';
import ViewResource from './components/resource/ViewResource';
import EditResource from './components/resource/EditResource';
import Settings from './components/settings/Settings';
import DeleteAccount from './components/settings/DeleteAccount';
import DeleteResource from './components/resource/DeleteResource';

function App() {
  const { data, error, loading } = useQuery<CurrentUserQuery>(CurrentUser);
  if (!loading && data?.currentUser?._id != null && !error) {
    setSessionValue(CURRENT_USER_DATA, data.currentUser)
  }
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={Login} />
        {!loading ? <GuardedRoute path='/' auth={data?.currentUser?._id != null} exact component={Home}/> : null}
        {!loading ? <GuardedRoute path='/createResource' auth={data?.currentUser?._id != null} exact component={CreateResource} /> : null}
        {!loading ? <GuardedRoute path='/viewResource/:id' auth={data?.currentUser?._id != null} exact component={ViewResource} /> : null}
        {!loading ? <GuardedRoute path='/editResource/:id' auth={data?.currentUser?._id != null} exact component={EditResource} /> : null}
        {!loading ? <GuardedRoute path='/deleteResource/:id' auth={data?.currentUser?._id != null} exact component={DeleteResource} /> : null}
        {!loading ? <GuardedRoute path='/settings' auth={data?.currentUser?._id != null} exact component={Settings} /> : null}
        {!loading ? <GuardedRoute path='/deleteAccount' auth={data?.currentUser?._id != null} exact component={DeleteAccount} /> : null}
        <Route path="*" component={LoadingScreen} />
      </Switch>
    </Router>
  );
}



export default App;

