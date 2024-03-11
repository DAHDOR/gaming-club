import { FC, useContext, useState } from 'react';
import {
  SubmitButton,
  Form,
  Input,
  LoginContainer,
  LoginWrapper,
  LogoContainer,
  ChangeSignButton,
  GoogleContainer,
  GoogleButton,
  GoogleButtonContent,
  GoogleButtonText,
  InputContainer,
  ErrorText,
  SubmitContainer,
} from '../../common/Style';
import Logo from '../../common/Logo';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../config/Firebase';
import { ProfileContext } from '../../context/ProfileContext';
import { GoogleIcon } from '../../common/Icons';
import { useMediaQuery } from 'react-responsive';
import { signInWithPopup } from 'firebase/auth';

const Signup: FC = () => {
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(true);
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length > 0 && e.target.value.length <= 20) {
      setValidName(true);
      setNameEmpty(false);
    } else {
      setValidName(false);
      if (e.target.value.length === 0) {
        setNameEmpty(true);
      } else {
        setNameEmpty(false);
      }
    }
  };

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameEmpty, setLastNameEmpty] = useState(true);
  const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    if (e.target.value.length > 0 && e.target.value.length <= 20) {
      setValidLastName(true);
      setLastNameEmpty(false);
    } else {
      setValidLastName(false);
      if (e.target.value.length === 0) {
        setLastNameEmpty(true);
      } else {
        setLastNameEmpty(false);
      }
    }
  };

  const [username, setUsername] = useState('');
  const [usernameUnique, setUsernameUnique] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [usernameEmpty, setUsernameEmpty] = useState(true);
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameUnique(true);
    // TODO: check if username is unique
    const re = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]([a-zA-Z0-9_.]{0,28}[a-zA-Z0-9_])?$/;
    if (re.test(e.target.value)) {
      setValidUsername(true);
      setUsernameEmpty(false);
    } else {
      setValidUsername(false);
      if (e.target.value.length === 0) {
        setUsernameEmpty(true);
      } else {
        setUsernameEmpty(false);
      }
    }
  };

  const [email, setEmail] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(true);
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailExists(false);
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

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdEmpty, setPwdEmpty] = useState(true);
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

  const [confirmPwd, setConfirmPwd] = useState('');
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  const [confirmPwdEmpty, setConfirmPwdEmpty] = useState(true);
  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPwd(e.target.value);
    if (e.target.value === pwd) {
      setValidConfirmPwd(true);
    } else {
      setValidConfirmPwd(false);
    }
    if (e.target.value.length === 0) {
      setConfirmPwdEmpty(true);
    } else {
      setConfirmPwdEmpty(false);
    }
  };

  /* const [game, setGame] = useState('');
  const onGameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGame(e.target.value);
    // TODO
  }; */

  const [signingUp, setSigningUp] = useState(false);

  const { theme } = useContext(ThemeContext);
  const { setProfile } = useContext(ProfileContext);

  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSigningUp(true);
    // TODO: check if email is in db
    // TODO: check if username is unique
    // TODO: create user & profile
  };

  const onLogin = () => {
    navigate('/login');
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

  const isMobile = useMediaQuery({ query: '(max-width: 30rem)' });

  return (
    <LoginWrapper>
      <LoginContainer>
        <LogoContainer>
          <Logo theme={theme.name === 'dark' ? 'dark' : 'color'} mode="combo" />
        </LogoContainer>
        <h1>Registrarse</h1>
        <Form onSubmit={onSubmit}>
          <InputContainer>
            <Input
              style={
                validName || nameEmpty ? {} : { border: '1px solid #ff2200' }
              }
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={onNameChange}
            />
            <ErrorText>
              {validName || nameEmpty
                ? ''
                : 'El nombre no puede tener más de 20 caracteres'}
            </ErrorText>
          </InputContainer>
          <InputContainer>
            <Input
              style={
                validLastName || lastNameEmpty
                  ? {}
                  : { border: '1px solid #ff2200' }
              }
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={onLastNameChange}
            />
            <ErrorText>
              {validLastName || lastNameEmpty
                ? ''
                : 'El apellido no puede tener más de 20 caracteres'}
            </ErrorText>
          </InputContainer>
          <InputContainer>
            <Input
              style={
                validUsername || usernameEmpty
                  ? {}
                  : { border: '1px solid #ff2200' }
              }
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={onUsernameChange}
            />
            <ErrorText>
              {validUsername || usernameEmpty
                ? ''
                : 'Nombre de usuario inválido. Ejemplo válido: "Hola_.123".'}
            </ErrorText>
          </InputContainer>
          <InputContainer>
            <Input
              style={
                validEmail || emailEmpty ? {} : { border: '1px solid #ff2200' }
              }
              type="email"
              placeholder="Correo electrónico"
              value={email}
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
              type="password"
              placeholder="Contraseña"
              value={pwd}
              onChange={onPasswordChange}
            />
            <ErrorText>
              {validPwd || pwdEmpty
                ? ''
                : 'La contraseña debe tener entre 8 y 30 caracteres'}
            </ErrorText>
          </InputContainer>
          <InputContainer>
            <Input
              style={
                validConfirmPwd || confirmPwdEmpty
                  ? {}
                  : { border: '1px solid #ff2200' }
              }
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPwd}
              onChange={onConfirmPasswordChange}
            />
            <ErrorText>
              {validConfirmPwd || confirmPwdEmpty
                ? ''
                : 'Las contraseñas no son iguales'}
            </ErrorText>
          </InputContainer>
          <SubmitContainer>
            <SubmitButton
              style={
                validName &&
                validLastName &&
                validUsername &&
                validEmail &&
                validPwd &&
                validConfirmPwd &&
                !signingUp
                  ? {}
                  : { cursor: 'not-allowed', backgroundColor: theme.main }
              }
              type="submit"
              disabled={
                !validName ||
                !validLastName ||
                !validUsername ||
                !validEmail ||
                !validPwd ||
                !validConfirmPwd
              }
            >
              {signingUp ? 'Registrando...' : 'Registrarse'}
            </SubmitButton>
            {emailExists && (
              <ErrorText>El correo electrónico ya está registrado.</ErrorText>
            )}
            {usernameUnique && (
              <ErrorText>El nombre de usuario ya está en uso.</ErrorText>
            )}
          </SubmitContainer>
        </Form>
        <ChangeSignButton onClick={onLogin}>
          ¿Ya tienes una cuenta?
        </ChangeSignButton>
        <GoogleContainer>
          <GoogleButton onClick={onGoogleLogin}>
            <GoogleButtonContent>
              <GoogleIcon />
            </GoogleButtonContent>
            {!isMobile && (
              <GoogleButtonText>Registrarse con Google</GoogleButtonText>
            )}
          </GoogleButton>
        </GoogleContainer>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Signup;
