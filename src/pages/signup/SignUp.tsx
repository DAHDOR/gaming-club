import { FC, useContext, useState } from 'react';
import {
  SubmitButton,
  Form,
  Input,
  LoginContainer,
  LoginWrapper,
  LogoContainer,
} from '../../common/Style';
import Logo from '../../common/Logo';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/Firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { ProfileContext } from '../../context/ProfileContext';

const Signup: FC = () => {
  const { theme } = useContext(ThemeContext);
  const { setProfile } = useContext(ProfileContext);
  const [videojuego, setVideojuego] = useState('');
  const [videojuegoValido, setVideojuegoValido] = useState(true);
  const [perfilValido, setPerfilValido] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificar si el videojuego ingresado por el usuario está presente en Firestore
    const videojuegoQuery = query(
      collection(db, 'games'),
      where('name', '==', videojuego)
    );
    const videojuegoSnapshot = await getDocs(videojuegoQuery);

    if (!videojuegoSnapshot.empty) {
      // El videojuego está presente en Firestore
      setVideojuegoValido(true);
      setPerfilValido(true);
      // Continuar con el proceso de registro del usuario
      const nuevoPerfil = {
        id: crypto.randomUUID(),
        name: `${nombre} ${apellido}`,
        //username: username,
        email: correo,
        //password: password,
        //videojuego: videojuego,
        pfp: '',
        clubs: [],
      };

      setProfile(nuevoPerfil);

      try {
        // Añadir el nuevo perfil a la colección 'perfiles' en Firestore
        const perfilRef = await addDoc(collection(db, 'profiles'), nuevoPerfil);

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        console.error('Error al añadir el perfil:', error);
      }
    } else {
      // El videojuego NO está presente en Firestore
      setVideojuegoValido(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <LogoContainer>
          <Logo theme={theme.name === 'dark' ? 'dark' : 'color'} mode="combo" />
        </LogoContainer>
        <h1>Registrar cuenta</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Videojuego preferido"
            value={videojuego}
            onChange={(e) => setVideojuego(e.target.value)}
          />
          {!videojuegoValido && <p>El videojuego ingresado no es válido.</p>}
          <SubmitButton type="submit">Submit</SubmitButton>
          {perfilValido && <p>Cuenta creada con exito!.</p>}
        </Form>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Signup;
