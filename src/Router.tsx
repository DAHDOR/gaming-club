import { FC } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import RouterLayout from './common/RouterLayout';
import Home from './pages';
import NotFound from './pages/notfound';
import Dashboard from './pages/dashboard';
import SettingsProfile from './pages/settings/profile';
import SettingsAccount from './pages/settings/account';
import SettingsBilling from './pages/settings/billing';
import SettingsPrivacy from './pages/settings/privacy';
import Login from './pages/login';
import Signup from './pages/signup';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouterLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings/profile" element={<SettingsProfile />} />
          <Route path="/settings/account" element={<SettingsAccount />} />
          <Route path="/settings/billing" element={<SettingsBilling />} />
          <Route path="/settings/privacy" element={<SettingsPrivacy />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
