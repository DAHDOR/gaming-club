import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';

const GameDetails: FC = () => {
  const [game, setGame] = useState(null);
  const { gameId } = useParams(); // Obtiene el gameId de la URL

  useEffect(() => {
    const fetchGame = async () => {
      const docRef = doc(db, 'games', gameId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setGame({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
    };

    fetchGame();
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{game.name}</h1>
      <p>{game.description}</p>
      {/* Muestra más detalles del juego aquí, porque no recuerdo si tiene mas campos y no puedo fer firebase */} 
    </div>
  );
};

export default GameDetails;