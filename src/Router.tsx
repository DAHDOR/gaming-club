import { FC } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import RouterLayout from './common/RouterLayout';
import Home from './pages';
import NotFound from './pages/notfound';
import Login from './pages/login';
import Signup from './pages/signup';
import Auth from './components/auth/Auth';
import Profile from './pages/profile';
import ClubDetails from './pages/clubdetails';
import GameDetails from './pages/gamedetails';
import Games from './pages/games';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouterLayout />}>
          <Route
            path="/"
            element={
              <Auth>
                <Home />
              </Auth>
            }
          />
          <Route
            path="/club/:clubId"
            element={
              <Auth>
                <ClubDetails />
              </Auth>
            }
          />
          <Route
            path="/game/:gameId"
            element={
              <Auth>
                <GameDetails />
              </Auth>
            }
          />
          <Route
            path="*"
            element={
              <Auth>
                <NotFound />
              </Auth>
            }
          />
          <Route
            path="/profile"
            element={
              <Auth>
                <Profile />
              </Auth>
            }
          />
          <Route path="/games" element={<Games />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
