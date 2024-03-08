import { FC, createContext, useContext, useState } from 'react';
import { IconWrapper, Wrapper, Button, Menu, MenuButton } from './More.style';
import { MoreIcon } from '../../common/Icons';
import { useOutsideClick } from '../../utils/CustomHooks';
import { PreferencesContext } from '../../context/PreferencesContext';

interface MenuContextModel {
  menu: string;
  setMenu: (menu: string) => void;
}

const MenuContext = createContext<MenuContextModel>({
  menu: 'main',
  setMenu: () => {},
});

const Icon: FC = () => {
  return (
    <IconWrapper style={{ width: '1.5rem', height: '1.5rem' }}>
      <MoreIcon />
    </IconWrapper>
  );
};

const MainMenu: FC = () => {
  const { setMenu } = useContext(MenuContext);

  const themeMenu = () => {
    setMenu('theme');
  };

  return (
    <Menu>
      <MenuButton onClick={themeMenu}>Tema</MenuButton>
      <MenuButton>Item 2</MenuButton>
      <MenuButton>Item 3</MenuButton>
    </Menu>
  );
};

const ThemeMenu: FC = () => {
  const { preferences, setPreferences } = useContext(PreferencesContext);

  const setSystem = () => {
    setPreferences({ ...preferences, theme: 'system' });
  };

  const setDark = () => {
    setPreferences({ ...preferences, theme: 'dark' });
  };

  const setLight = () => {
    setPreferences({ ...preferences, theme: 'light' });
  };

  return (
    <Menu>
      <MenuButton onClick={setSystem}>Tema del dispositivo</MenuButton>
      <MenuButton onClick={setDark}>Tema oscuro</MenuButton>
      <MenuButton onClick={setLight}>Tema claro</MenuButton>
    </Menu>
  );
};

const Kebab: FC = () => {
  const [dropdown, setDropdown] = useState(false);
  const [menu, setMenu] = useState('main');

  const toggleDropdown = () => {
    if (dropdown) {
      setDropdown(false);
      setMenu('main');
    } else {
      setDropdown(true);
    }
  };

  const dropdownRef = useOutsideClick(() => {
    setDropdown(false);
    setMenu('main');
  });

  return (
    <MenuContext.Provider value={{ menu: menu, setMenu: setMenu }}>
      <Wrapper ref={dropdownRef}>
        <Button onClick={toggleDropdown}>
          <Icon />
        </Button>
        {dropdown &&
          ((menu === 'main' && <MainMenu />) ||
            (menu === 'theme' && <ThemeMenu />))}
      </Wrapper>
    </MenuContext.Provider>
  );
};

export default Kebab;
