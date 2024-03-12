import { FC, useContext } from 'react';
import {
  HomeRedirect,
  LeftContainer,
  NavbarContainer,
  Redirect,
  RightContainer,
} from './Navbar.style';
import Logo from '../../common/Logo';
import Kebab from './More';
import { ThemeContext } from '../../context/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../context/ProfileContext';

const Navbar: FC = () => {
  const { theme } = useContext(ThemeContext);
  const { profile } = useContext(ProfileContext);

  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();

  const onHome = () => {
    navigate('/');
  };

  return (
    <NavbarContainer>
      <LeftContainer>
        <HomeRedirect onClick={onHome}>
          <Logo theme={theme.name === 'dark' ? 'dark' : 'color'} mode="combo" />
        </HomeRedirect>
        {profile && (
          <>
            <Redirect
              style={
                path === '/'
                  ? {
                      color: `${theme.button}`,
                      borderBottom: `1px solid ${theme.button}`,
                    }
                  : {}
              }
              onClick={() => navigate('/')}
            >
              Clubes
            </Redirect>
            <Redirect
              style={
                path === '/games'
                  ? {
                      color: `${theme.button}`,
                      borderBottom: `1px solid ${theme.button}`,
                    }
                  : {}
              }
              onClick={() => navigate('/games')}
            >
              Juegos
            </Redirect>
          </>
        )}
      </LeftContainer>
      <RightContainer>
        <Kebab />
      </RightContainer>
    </NavbarContainer>
  );
};

export default Navbar;
