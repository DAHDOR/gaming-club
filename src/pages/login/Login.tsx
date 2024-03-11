import { FC, useContext, useState } from 'react';
import {
  SubmitButton,
  ErrorText,
  Form,
  GoogleButton,
  GoogleButtonContent,
  GoogleButtonText,
  GoogleContainer,
  Input,
  InputContainer,
  LoginContainer,
  LoginWrapper,
  LogoContainer,
  ChangeSignButton,
  SubmitContainer,
} from '../../common/Style';
import Logo from '../../common/Logo';
import { ThemeContext } from '../../context/ThemeContext';
import { GoogleIcon } from '../../common/Icons';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../../config/Firebase';
import { ProfileContext } from '../../context/ProfileContext';
import { doc, getDoc } from 'firebase/firestore';
import Profile from '../../models/Profile';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(true);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdEmpty, setPwdEmpty] = useState(true);

  const [loggingIn, setLoggingIn] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const { theme } = useContext(ThemeContext);
  const { setProfile } = useContext(ProfileContext);

  const navigate = useNavigate();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.validity.valid && e.target.value.length > 0) {
      setValidEmail(true);
    } else {
      if (e.target.value.length === 0) {
        setEmailEmpty(true);
      } else {
        setEmailEmpty(false);
      }
      setValidEmail(false);
    }
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
    if (e.target.value.length >= 8 && e.target.value.length <= 30) {
      setValidPwd(true);
    } else {
      if (e.target.value.length === 0) {
        setPwdEmpty(true);
      } else {
        setPwdEmpty(false);
      }
      setValidPwd(false);
    }
  };

  const onSignUp = () => {
    navigate('/signup');
  };

  const onGoogleLogin = () => {
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoggingIn(true);
    setInvalid(false);

    signInWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        const id = userCredential.user.uid;
        getDoc(doc(db, 'profiles', id)).then((doc) => {
          const data = doc.data() as Profile;
          setProfile({
            id: data.id,
            name: data.name,
            email: data.email,
            pfp: data.pfp,
            clubs: data.clubs,
          });
        });
        navigate('/');
      })
      .catch((error) => {
        console.log(error.code, error.message);
        setInvalid(true);
        setLoggingIn(false);
      });
  };

  const isMobile = useMediaQuery({ query: '(max-width: 30rem)' });

  return (
    <LoginWrapper>
      <LoginContainer>
        <LogoContainer>
          <Logo theme={theme.name === 'dark' ? 'dark' : 'color'} mode="combo" />
        </LogoContainer>
        <h1>Clubes de Videojuegos</h1>
        <Form onSubmit={onSubmit}>
          <InputContainer>
            <Input
              style={
                validEmail || emailEmpty ? {} : { border: '1px solid #ff2200' }
              }
              value={email}
              type="email"
              placeholder="Correo electrónico"
              onChange={onEmailChange}
            />
            <ErrorText>
              {validEmail || emailEmpty ? '' : 'Email inválido'}
            </ErrorText>
          </InputContainer>
          <InputContainer>
            <Input
              style={
                validPwd || pwdEmpty ? {} : { border: '1px solid #ff2200' }
              }
              value={pwd}
              type="password"
              placeholder="Contraseña"
              onChange={onPasswordChange}
            />
            <ErrorText>
              {validPwd || pwdEmpty
                ? ''
                : 'La contraseña debe tener entre 8 y 30 caracteres'}
            </ErrorText>
          </InputContainer>
          <SubmitContainer>
            <SubmitButton
              style={
                validEmail && validPwd && !loggingIn
                  ? {}
                  : { cursor: 'not-allowed', backgroundColor: theme.main }
              }
              type="submit"
              disabled={!validEmail || !validPwd}
            >
              {loggingIn ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            </SubmitButton>
            <ErrorText>{invalid ? 'Credenciales inválidas' : ''}</ErrorText>
          </SubmitContainer>
        </Form>
        <ChangeSignButton onClick={onSignUp}>
          ¿No tienes una cuenta?
        </ChangeSignButton>
        <GoogleContainer>
          <GoogleButton onClick={onGoogleLogin}>
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
