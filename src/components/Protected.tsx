import { ReactNode, useEffect } from 'react'
import { useAuth } from '../context/auth-context'
import { useNavigate } from 'react-router-dom';

const Protected = ({ children }: { children: ReactNode }) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    return isAuth ? <>{children}</> : null;

    // const { keycloak } = useKeycloak();

    // const isLoggedIn = keycloak.authenticated;
   
    // return isLoggedIn ? children : null;
};

export default Protected