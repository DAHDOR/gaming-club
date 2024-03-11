import { FC, useEffect, useState } from 'react';
import { db } from '../config/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface Club {
    id: string;
    description: string;
    name: string;
    games: string[];
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
                // Envuelve cada club con Link para hacerlo clickeable
                <Link to={`/club/${club.id}`} key={club.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                        <h2>{club.name}</h2>
                        <p>{club.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Clubs;
