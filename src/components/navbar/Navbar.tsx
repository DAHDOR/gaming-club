import { FC, useContext } from 'react';
import {
  HomeRedirect,
  LeftContainer,
  NavbarContainer,
  RightContainer,
} from './Navbar.style';
import Logo from '../../common/Logo';
import Kebab from './More';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar: FC = () => {
  const { theme } = useContext(ThemeContext);

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
      </LeftContainer>
      <RightContainer>
        <Kebab />
      </RightContainer>
    </NavbarContainer>
  );
};

export default Navbar;
