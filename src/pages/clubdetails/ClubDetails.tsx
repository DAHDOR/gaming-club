import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import Club, { isClub } from '../../models/Club';
import Game, { isGame } from '../../models/Game';
import {
  Container,
  ItemButton,
  ItemContainer,
} from '../../common/General.style';
import { ProfileContext } from '../../context/ProfileContext';

const ClubDetails: FC = () => {
  const { profile, setProfile } = useContext(ProfileContext);

  const [club, setClub] = useState<Club | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [affiliated, setAffiliated] = useState(false);

  const { clubId } = useParams();

  const onAffiliate = () => {
    if (profile && club) {
      if (profile.clubs.includes(club.id)) {
        const updatedClubs = profile.clubs.filter(
          (clubId) => clubId !== club.id
        );
        setProfile({ ...profile, clubs: updatedClubs });
        setAffiliated(false);
      } else {
        setProfile({ ...profile, clubs: [...profile.clubs, club.id] });
        setAffiliated(true);
      }
    }
  };

  const navigate = useNavigate();

  const profileRef = useRef(profile);

  useEffect(() => {
    const fetchClub = async () => {
      if (clubId) {
        const clubRef = doc(db, 'clubs', clubId);
        const clubSnap = await getDoc(clubRef);
        if (clubSnap.exists()) {
          const club = clubSnap.data();
          if (isClub(club)) {
            const currProfile = profileRef.current;
            if (currProfile && currProfile.clubs.includes(club.id)) {
              setAffiliated(true);
            }
            setClub(club);
            const gamePromises = club.games.map(async (gameId: string) => {
              const gameRef = doc(db, 'games', gameId);
              const gameSnap = await getDoc(gameRef);
              if (gameSnap.exists()) {
                const game = gameSnap.data();
                if (isGame(game)) {
                  return game;
                }
              }
            });
            const gameList = await Promise.all(gamePromises);
            setGames(gameList.filter(Boolean) as Game[]);
          }
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }

      return () => setGames([]);
    };
    console.log('Fetching club');
    fetchClub();
  }, [clubId, navigate]);

  if (!club) {
    return <Container>Cargando...</Container>;
  } else {
    return (
      <Container>
        <h1 style={{ margin: '0' }}>{club.name}</h1>
        <h3 style={{ margin: '0' }}>{club.description}</h3>
        <ItemButton onClick={onAffiliate}>
          <ItemContainer>
            {affiliated ? 'Desafiliarse' : 'Afiliarse'}
          </ItemContainer>
        </ItemButton>
        <h2 style={{ margin: '0' }}>Juegos</h2>
        {games.map((game) => (
          <ItemButton
            onClick={() => navigate(`/game/${game.id}`)}
            key={game.id}
          >
            <ItemContainer>{game.name}</ItemContainer>
          </ItemButton>
        ))}
      </Container>
    );
  }
};

export default ClubDetails;
