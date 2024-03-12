import { FC, useContext, useEffect, useState } from 'react';
import {
  SubmitButton,
  Form,
  Input,
  FormContainer,
  FormWrapper,
  LogoContainer,
  ChangeSignButton,
  GoogleContainer,
  GoogleButton,
  GoogleButtonContent,
  GoogleButtonText,
  InputContainer,
  ErrorText,
  SubmitContainer,
} from '../../common/General.style';
import Logo from '../../common/Logo';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { auth, db, provider } from '../../config/Firebase';
import { ProfileContext } from '../../context/ProfileContext';
import { GoogleIcon } from '../../common/Icons';
import { useMediaQuery } from 'react-responsive';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import Profile, { isProfile } from '../../models/Profile';
import Game, { isGame } from '../../models/Game';
import { useOutsideClick } from '../../utils/CustomHooks';
import { DropdownWrapper, Menu, MenuButton } from './SignUp.style';

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
  const [emailUnique, setEmailUnique] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(true);
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailUnique(true);
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

  const [games, setGames] = useState<Game[]>([]);
  const [gameId, setGameId] = useState('');
  const [gameName, setGameName] = useState('');
  const [searchGame, setSearchGame] = useState('');
  const onSearchGameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchGame(e.target.value);
  };

  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useOutsideClick(() => {
    setDropdown(false);
  });

  const [signingUp, setSigningUp] = useState(false);

  const { theme } = useContext(ThemeContext);
  const { profile, setProfile } = useContext(ProfileContext);

  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSigningUp(true);

    const profilesRef = collection(db, 'profiles');
    const profilesSnap = await getDocs(profilesRef);
    const profileList: Profile[] = [];
    profilesSnap.forEach((doc) => {
      const profile = doc.data();
      if (isProfile(profile)) {
        profileList.push(profile);
        if (profile && profile.email === email) {
          setEmailUnique(false);
        }
        if (profile && profile.username === username) {
          setUsernameUnique(false);
        }
      }
    });

    if (emailUnique && usernameUnique) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pwd
      );

      const profileRef = doc(db, 'profiles', userCredential.user.uid);
      const profileData: Profile = {
        id: userCredential.user.uid,
        name: `${name} ${lastName}`,
        username: username,
        email: email,
        pfp: '',
        game: gameId,
        clubs: [],
      };
      await setDoc(profileRef, profileData);
      setProfile(profileData);
      navigate('/');
    } else {
      setSigningUp(false);
    }
  };

  const onLogin = () => {
    navigate('/login');
  };

  const onGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const profileRef = doc(db, 'profile', user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          const profile = profileSnap.data();
          if (isProfile(profile)) {
            setProfile(profile);
            navigate('/');
          } else {
            console.error('Type error: profile is not a Profile object');
          }
        } else {
          setProfile({
            id: user.uid,
            name: user.displayName || '',
            username: '',
            email: user.email || '',
            pfp: user.photoURL || '',
            game: '',
            clubs: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isMobile = useMediaQuery({ query: '(max-width: 30rem)' });

  useEffect(() => {
    if (profile) {
      navigate('/');
    }

    const fetchGames = async () => {
      const gamesRef = collection(db, 'games');
      const gamesSnap = await getDocs(gamesRef);
      const gameList: Game[] = [];
      gamesSnap.forEach((doc) => {
        const game = doc.data();
        if (isGame(game)) {
          gameList.push(game);
        }
      });
      setGames(gameList);
    };

    console.log('Fetching games');
    fetchGames();
  }, [profile, navigate]);

  return (
    <FormWrapper>
      <FormContainer>
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
                : 'Las contraseñas no coinciden'}
            </ErrorText>
          </InputContainer>
          <InputContainer>
            <DropdownWrapper ref={dropdownRef}>
              <Input
                placeholder={
                  gameName === '' ? 'Buscar juego favorito...' : gameName
                }
                onChange={onSearchGameChange}
                value={searchGame}
                onFocus={() => setDropdown(true)}
              />
              {dropdown && (
                <Menu>
                  {games
                    .filter((game) =>
                      game.name.toLowerCase().includes(searchGame.toLowerCase())
                    )
                    .map((game) => (
                      <MenuButton
                        key={game.id}
                        onClick={() => {
                          setGameId(game.id);
                          setGameName(game.name);
                          setSearchGame('');
                          setDropdown(false);
                        }}
                      >
                        {game.name}
                      </MenuButton>
                    ))}
                </Menu>
              )}
            </DropdownWrapper>
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
                gameId !== '' &&
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
                !validConfirmPwd ||
                gameId === '' ||
                signingUp
              }
            >
              {signingUp ? 'Registrando...' : 'Registrarse'}
            </SubmitButton>
            {!emailUnique && (
              <ErrorText>El correo electrónico ya está registrado.</ErrorText>
            )}
            {!usernameUnique && (
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
      </FormContainer>
    </FormWrapper>
  );
};

export default Signup;
