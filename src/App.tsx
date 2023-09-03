import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingScreen from './components/generic/LoadingScreen';
import Login from './components/login/Login';
import { GuardedRoute, ProtectedRouteProps } from './components/generic/GuardedRoute';
import { CurrentUser, CurrentUserQuery } from "allotr-graphql-schema-types";
import { useQuery } from "@apollo/client";
import { CURRENT_USER_DATA } from './consts/global_session_keys';
import { setSessionValue } from './utils/storage-utils';
import { lazy, Suspense } from 'react';
import NotificationDialogParent from './components/notifications/NotificationDialogParent';

// Lazy load pages
const Home = lazy(() => import('./components/home/Home'));
const CreateResource = lazy(() => import('./components/resource/CreateResource'));
const ViewResource = lazy(() => import('./components/resource/ViewResource'));
const EditResource = lazy(() => import('./components/resource/EditResource'));
const Settings = lazy(() => import('./components/settings/Settings'));
const DeleteAccount = lazy(() => import('./components/settings/DeleteAccount'));
const DeleteResource = lazy(() => import('./components/resource/DeleteResource'));


function App() {
  const { data, error, loading } = useQuery<CurrentUserQuery>(CurrentUser);
  if (!loading && data?.currentUser?._id != null && !error) {
    setSessionValue(CURRENT_USER_DATA, data.currentUser)
  }

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: data?.currentUser?._id != null,
    authenticationPath: '/login',
  };

  return (
    <div>
      {!loading ? <NotificationDialogParent /> : null}
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          {!loading ? <Route path='/' element={<GuardedRoute {...defaultProtectedRouteProps} outlet={<Suspense fallback={<LoadingScreen />}><Home /></Suspense>} />} /> : null}
          {!loading ? <Route path='/createResource' element={<GuardedRoute {...defaultProtectedRouteProps} outlet={<Suspense fallback={<LoadingScreen />}><CreateResource /></Suspense>} />} /> : null}
          {!loading ? <Route path='/viewResource/:id' element={<GuardedRoute {...defaultProtectedRouteProps} outlet={<Suspense fallback={<LoadingScreen />}><ViewResource /></Suspense>} />} /> : null}
          {!loading ? <Route path='/editResource/:id' element={<GuardedRoute {...defaultProtectedRouteProps} outlet={<Suspense fallback={<LoadingScreen />}><EditResource /></Suspense>} />} /> : null}
          {!loading ? <Route path='/deleteResource/:id' element={<GuardedRoute {...defaultProtectedRouteProps} outlet={<Suspense fallback={<LoadingScreen />}><DeleteResource /></Suspense>} />} /> : null}
          {!loading ? <Route path='/settings' element={<GuardedRoute {...defaultProtectedRouteProps} outlet={<Suspense fallback={<LoadingScreen />}><Settings /></Suspense>} />} /> : null}
          {!loading ? <Route path='/deleteAccount' element={<GuardedRoute {...defaultProtectedRouteProps} outlet={<Suspense fallback={<LoadingScreen />}><DeleteAccount /></Suspense>} />} /> : null}
          <Route path="*" element={<LoadingScreen />} />
        </Routes>
      </Router>
    </div>
  );
}



export default App;

