import { FC, useContext, useState, useEffect } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import { LoginContainer, Form, Input, AccessButton } from '../login/Login.style';
import { db } from '../../config/Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile: FC = () => {
    const { profile, setProfile } = useContext(ProfileContext);
    const navigate = useNavigate();
    // Estados locales inicialmente vacíos o con valores por defecto
    const [name, setName] = useState('');
    const [videojuego, setVideojuego] = useState('');

    // Efecto para establecer los estados una vez que el perfil esté disponible
    useEffect(() => {
        if (profile) {
            setName(profile.name || '');
            //setVideojuego(profile.videojuego || '');
        }
    }, []); // Dependencia en el perfil del contexto
    const handleSaveChanges = async () => {
        if (!profile) {
            console.error('No hay perfil para actualizar');
            return;
        }

        try {
            const userRef = doc(db, 'usuarios', profile.id);
            await updateDoc(userRef, {
                name: name,
                //videojuego: videojuego,
            });
            // Suponiendo que setProfile es una función para actualizar el contexto
            setProfile({ ...profile, name}); // videojuego tambien.
            navigate('/home');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };

    if (!profile) {
        return <div>Cargando perfil...</div>; // O cualquier otro marcado para indicar carga o perfil no disponible
    }

    return (
      <LoginContainer>
        <h1>Perfil del usuario</h1>
        <Form>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
          <Input type="email" value={profile.email || ''} readOnly placeholder="Correo electrónico" />
          <Input type="text" value={videojuego} onChange={(e) => setVideojuego(e.target.value)} placeholder="Videojuego preferido" />
          <AccessButton onClick={handleSaveChanges}>Guardar cambios</AccessButton>
        </Form>
      </LoginContainer>
    );
};

export default Profile;