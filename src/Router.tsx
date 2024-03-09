import { FC } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import RouterLayout from './common/RouterLayout';
import Home from './pages';
import NotFound from './pages/notfound';
import Login from './pages/login';
import Signup from './pages/signup';
import Auth from './components/auth/Auth';

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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
