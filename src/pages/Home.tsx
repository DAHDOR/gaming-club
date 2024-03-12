import { FC, useEffect, useState } from 'react';
import { db } from '../config/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Club, { isClub } from '../models/Club';
import {
  Container,
  ItemButton,
  ItemContainer,
  SearchInput,
} from '../common/General.style';

const Clubs: FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      const clubsRef = collection(db, 'clubs');
      const clubsSnap = await getDocs(clubsRef);
      const clubList: Club[] = [];
      clubsSnap.forEach((doc) => {
        const club = doc.data();
        if (isClub(club)) {
          clubList.push(club);
        }
      });
      setClubs(clubList);
    };

    console.log('Fetching clubs');
    fetchClubs();

    return () => {
      setSearch('');
      setClubs([]);
    };
  }, []);

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h1>Clubes</h1>
      <SearchInput
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar club..."
      />
      {filteredClubs.length > 0 ? (
        filteredClubs.map((club) => (
          <ItemButton
            onClick={() => navigate(`/club/${club.id}`)}
            key={club.id}
          >
            <ItemContainer>
              <h2>{club.name}</h2>
              <p>{club.description}</p>
            </ItemContainer>
          </ItemButton>
        ))
      ) : (
        <h3>No se encontraron clubes</h3>
      )}
    </Container>
  );
};

export default Clubs;
