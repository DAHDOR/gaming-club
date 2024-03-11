import { FC } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import RouterLayout from './common/RouterLayout';
import Home from './pages';
import NotFound from './pages/notfound';
import Login from './pages/login';
import Signup from './pages/signup';
import Auth from './components/auth/Auth';
import Profile from './pages/profile';
import Clubs from './pages'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <RouterLayout />
            </Auth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Clubs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
