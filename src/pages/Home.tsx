import { FC, useEffect, useState } from 'react';
import { db } from '../config/Firebase'; // Asegúrate de tener tu configuración de Firebase
import { collection, getDocs } from 'firebase/firestore';

interface Club {
    id: string;
    description: string;
    name: string;
    games: string[];
    // Incluye otros campos según los datos de tus clubes
}


const Clubs: FC = () => {
    const [clubs, setClubs] = useState<Club[]>([]);

    useEffect(() => {
        const fetchClubs = async () => {
            const clubsCollection = collection(db, 'clubs');
            const clubSnapshot = await getDocs(clubsCollection);
            const clubList: Club[] = clubSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }) as Club);
            setClubs(clubList);
        };


        fetchClubs();
    }, []);

    return (
        <div>
            {clubs.map((club) => (
                <div key={club.id} style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '5px' }}>
                    <h2>{club.name}</h2>
                    <p>{club.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Clubs;
