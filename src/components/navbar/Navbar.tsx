import { FC, useContext } from 'react';
import { LeftContainer, NavbarContainer, RightContainer } from './Navbar.style';
import Logo from '../../common/Logo';
import Kebab from './More';
import Access from './Access';
import { ThemeContext } from '../../context/ThemeContext';

const Navbar: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <NavbarContainer>
      <LeftContainer>
        <Logo theme={theme.name === 'dark' ? 'dark' : 'color'} mode="combo" />
      </LeftContainer>
      <RightContainer>
        <Access />
        <Kebab />
      </RightContainer>
    </NavbarContainer>
  );
};

export default Navbar;