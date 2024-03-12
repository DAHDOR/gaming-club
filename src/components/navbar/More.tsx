import { FC, createContext, useContext, useState } from 'react';
import { IconWrapper, Button, Menu, MenuButton, Img } from './More.style';
import { MoreIcon } from '../../common/Icons';
import { useOutsideClick } from '../../utils/CustomHooks';
import { PreferencesContext } from '../../context/PreferencesContext';
import { auth } from '../../config/Firebase';
import { signOut } from 'firebase/auth';
import { ProfileContext } from '../../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import { DropdownWrapper } from '../../common/General.style';

interface MenuContextModel {
  menu: string;
  setMenu: (menu: string) => void;
}

const MenuContext = createContext<MenuContextModel>({
  menu: 'main',
  setMenu: () => {},
});

const Icon: FC = () => {
  const { profile } = useContext(ProfileContext);
  if (profile && profile.pfp !== '') {
    return <Img src={profile.pfp}></Img>;
  } else {
    return (
      <IconWrapper style={{ width: '1.5rem', height: '1.5rem' }}>
        <MoreIcon />
      </IconWrapper>
    );
  }
};

const MainMenu: FC = () => {
  const { setMenu } = useContext(MenuContext);
  const { profile, setProfile } = useContext(ProfileContext);

  const navigate = useNavigate();

  const onLogout = () => {
    setProfile(null);
    signOut(auth);
  };

  const themeMenu = () => {
    setMenu('theme');
  };

  const onProfile = () => {
    navigate('/profile');
  };

  return (
    <Menu>
      <MenuButton onClick={themeMenu}>Tema</MenuButton>
      {profile && (
        <>
          <MenuButton onClick={onProfile}>Perfil</MenuButton>
          <MenuButton onClick={onLogout}>Cerrar sesión</MenuButton>
        </>
      )}
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
      <DropdownWrapper ref={dropdownRef}>
        <Button onClick={toggleDropdown}>
          <Icon />
        </Button>
        {dropdown &&
          ((menu === 'main' && <MainMenu />) ||
            (menu === 'theme' && <ThemeMenu />))}
      </DropdownWrapper>
    </MenuContext.Provider>
  );
};

export default Kebab;
