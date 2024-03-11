import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';

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
    <div>
      <h1>{club.name}</h1>
      <p>{club.description}</p>
      {/* Muestra la lista de juegos si existe */}
      {club.games && club.games.length > 0 && (
        <div>
          <h2>Juegos</h2>
          <ul>
            {club.games.map((game, id) => (
              <li key={id}>{game.name}</li> // ID como key
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClubDetails;
