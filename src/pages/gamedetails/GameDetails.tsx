import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import Game, { isGame } from '../../models/Game';
import { Container } from '../../common/General.style';

const GameDetails: FC = () => {
  const [game, setGame] = useState<Game | null>(null);
  const { gameId } = useParams(); // Obtiene el gameId de la URL

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      if (gameId) {
        const gameRef = doc(db, 'games', gameId);
        const gameSnap = await getDoc(gameRef);
        if (gameSnap.exists()) {
          const game = gameSnap.data();
          if (isGame(game)) {
            setGame(game);
          }
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };
    console.log('Fetching game');
    fetchGame();
  }, [gameId, navigate]);

  if (!game) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Container>
      <h1 style={{ margin: '0' }}>{game.name}</h1>
      <h4 style={{ margin: '0' }}>Género: {game.genre}</h4>
      <h3 style={{ margin: '0' }}>{game.description}</h3>
    </Container>
  );
};

export default GameDetails;
