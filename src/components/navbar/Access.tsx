import { FC } from 'react';
import { Button } from './Access.style';
import { useNavigate } from 'react-router-dom';

const Access: FC = () => {
  const navigate = useNavigate();

  const handleAccess = () => {
    navigate('/login');
  };

  return <Button onClick={handleAccess}>Iniciar Sesión</Button>;
};

export default Access;
