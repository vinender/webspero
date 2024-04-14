import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import { LoginForm } from './components/pages/auth/login';
import { RegisterForm } from './components/pages/auth/register';
 import Home from './components/pages/home/home';
import NearByUsers from './components/pages/near-by-users/near-by-users';
import Profile from './components/pages/profile/profile';
import useInitializeAuth from './components/utils/useInitializeAuth';
import { Provider } from 'react-redux';
import store from './components/utils/redux/store';
function App() {

  // useInitializeAuth();
  return (
    // <Provider store={store}>
    <Router>
      <Routes>
      <Route
          element={<Layout><Home /></Layout>}
          path="/"
        />
         <Route
          element={<Layout><NearByUsers /></Layout>}
          path="/near-by-users"
        />
        <Route
          element={<Layout><LoginForm /></Layout>}
          path="/login"
        />
        <Route
          element={<Layout><RegisterForm /></Layout>}
          path="/register"
        />
        <Route
          element={<Layout><Profile /></Layout>}
          path="/profile"
        />
      </Routes>
    </Router>
    // </Provider>
  );
}

export default App;
