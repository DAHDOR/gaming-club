import { FC, useContext } from 'react';
import {
  AccessButton,
  Form,
  GoogleButton,
  GoogleButtonContent,
  GoogleButtonText,
  GoogleContainer,
  Input,
  LoginContainer,
  LoginWrapper,
  LogoContainer,
  SignUpButton,
} from './Login.style';
import Logo from '../../common/Logo';
import { ThemeContext } from '../../context/ThemeContext';
import { GoogleIcon } from '../../common/Icons';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/Firebase';
import { ProfileContext } from '../../context/ProfileContext';

const Login: FC = () => {
  const { theme } = useContext(ThemeContext);
  const { setProfile } = useContext(ProfileContext);

  const navigate = useNavigate();

  const handleAccess = () => {
    navigate('/signup');
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setProfile({
          id: user.uid,
          name: user.displayName as string,
          email: user.email as string,
          pfp: user.photoURL || '',
          clubs: [],
        });

        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isMobile = useMediaQuery({ query: '(max-width: 25rem)' });

  return (
    <LoginWrapper>
      <LoginContainer>
        <LogoContainer>
          <Logo theme={theme.name === 'dark' ? 'dark' : 'color'} mode="combo" />
        </LogoContainer>
        <h1>Clubes de Videojuegos</h1>
        <Form>
          <Input type="text" placeholder="Correo electrónico" />
          <Input type="password" placeholder="Contraseña" />
          <AccessButton type="submit">Iniciar Sesión</AccessButton>
        </Form>
        <SignUpButton onClick={handleAccess}>
          ¿No tienes una cuenta?
        </SignUpButton>
        <GoogleContainer>
          <GoogleButton onClick={handleGoogleLogin}>
            <GoogleButtonContent>
              <GoogleIcon />
            </GoogleButtonContent>
            {!isMobile && (
              <GoogleButtonText>Iniciar sesión con Google</GoogleButtonText>
            )}
          </GoogleButton>
        </GoogleContainer>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;
