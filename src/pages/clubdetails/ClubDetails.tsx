import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { Link } from 'react-router-dom';

const ClubDetails: FC = () => {
  const [club, setClub] = useState(null);
  const { clubId } = useParams(); // Obtiene el clubId de la URL
  console.log(clubId);
  useEffect(() => {
    const fetchClub = async () => {
      const docRef = doc(db, 'clubs', clubId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setClub({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
    };

    fetchClub();
  }, [clubId]);

  if (!club) {
    return <div>Loading...</div>;
  }

  return (
    {club.games && club.games.length > 0 && (
      <div>
        <h1>{club.name}</h1>
        <p>{club.description}</p>
        <h2>Juegos</h2>
        <ul>
          {club.games.map((game, index) => (
            <li key={index}>
              <Link to={`/game/${game.id}`}>{game.name}</Link> {/* Usar game.id para la URL */}
            </li>
          ))}
        </ul>
      </div>
    )}
  );
};

export default ClubDetails;
