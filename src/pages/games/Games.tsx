import { FC, useEffect, useState } from 'react';
import { db } from '../../config/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  ItemButton,
  ItemContainer,
  SearchInput,
} from '../../common/General.style';
import Game, { isGame } from '../../models/Game';

const Clubs: FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
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

    return () => {
      setSearch('');
      setGames([]);
    };
  }, []);

  const filteredGames = games.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h1>Juegos</h1>
      <SearchInput
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar juego..."
      />
      {filteredGames.length > 0 ? (
        filteredGames.map((game) => (
          <ItemButton
            onClick={() => navigate(`/game/${game.id}`)}
            key={game.id}
          >
            <ItemContainer>
              <h2>{game.name}</h2>
              <p>{game.description}</p>
            </ItemContainer>
          </ItemButton>
        ))
      ) : (
        <h3>No se encontraron juegos</h3>
      )}
    </Container>
  );
};

export default Clubs;
