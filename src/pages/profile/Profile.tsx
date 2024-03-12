import { FC, useContext, useState, useEffect } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import {
  FormContainer,
  Form,
  Input,
  SubmitButton,
  FormWrapper,
  InputContainer,
  ErrorText,
} from '../../common/General.style';
import { db } from '../../config/Firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Game, { isGame } from '../../models/Game';
import { ThemeContext } from '../../context/ThemeContext';
import { DropdownWrapper, Menu, MenuButton } from '../signup/SignUp.style';
import { useOutsideClick } from '../../utils/CustomHooks';

const Profile: FC = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(true);
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

  const [changing, setChanging] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate('/login');
      return;
    }

    setName(profile.name);
    setGameId(profile.game);

    const fetchGames = async () => {
      const gamesRef = collection(db, 'games');
      const gamesSnap = await getDocs(gamesRef);
      const gameList: Game[] = [];
      gamesSnap.forEach((doc) => {
        const game = doc.data();
        if (isGame(game)) {
          gameList.push(game);
          if (game.id === profile.game) {
            setGameId(game.id);
            setGameName(game.name);
            setSearchGame('');
          }
        }
      });
      setGames(gameList);
    };

    console.log('Fetching games');
    fetchGames();
  }, [profile, navigate]);

  const onSubmit = async () => {
    console.log('Actualizando perfil...');

    setChanging(true);

    if (!profile) {
      console.error('Error: no hay perfil');
      navigate('/login');
      return;
    }

    const profileRef = doc(db, 'profiles', profile.id);

    if (name !== profile.name && gameId !== profile.game) {
      await updateDoc(profileRef, {
        name: name,
        game: gameId,
      });
    }

    setProfile({ ...profile, name: name, game: gameId });
    navigate('/');
  };

  if (!profile) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <FormWrapper>
      <FormContainer>
        <h1>Perfil del usuario</h1>
        <Form onSubmit={onSubmit}>
          <InputContainer>
            <Input
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="Nombre"
            />
            <ErrorText>
              {validName || nameEmpty
                ? ''
                : 'El nombre no puede tener más de 20 caracteres'}
            </ErrorText>
          </InputContainer>
          <InputContainer>
            <Input
              style={{
                border: `1px solid ${theme.stroke}`,
                color: `${theme.stroke}`,
              }}
              type="email"
              value={profile.email || ''}
              readOnly
              placeholder="Correo electrónico"
            />
            <ErrorText>{''}</ErrorText>
          </InputContainer>
          <InputContainer>
            <Input
              style={{
                border: `1px solid ${theme.stroke}`,
                color: `${theme.stroke}`,
              }}
              type="text"
              value={profile.username || ''}
              readOnly
              placeholder="Nombre de usuario"
            />
            <ErrorText>{''}</ErrorText>
          </InputContainer>
          <InputContainer>
            <DropdownWrapper ref={dropdownRef}>
              <Input
                placeholder={gameName}
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
          <SubmitButton
            style={
              validName && gameId !== '' && !changing
                ? {}
                : { cursor: 'not-allowed', backgroundColor: theme.main }
            }
            type="submit"
            disabled={!validName || gameId === '' || changing}
          >
            {changing ? 'Guardando...' : 'Guardar cambios'}
          </SubmitButton>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

export default Profile;
