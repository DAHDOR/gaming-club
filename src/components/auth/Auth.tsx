import { FC, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthProps {
  children: ReactNode;
}

const Auth: FC<AuthProps> = ({ children }: AuthProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <h1>Cargando...</h1>;

  return <>{children}</>;
};

export default Auth;
