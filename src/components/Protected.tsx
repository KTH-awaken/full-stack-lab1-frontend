import { ReactNode } from 'react'
import { useKeykloak } from '../context/keycloak-context';

const Protected = ({ children }: { children: ReactNode }) => {
    const { keycloak } = useKeykloak();
    const isLoggedIn = keycloak.authenticated;
    return isLoggedIn ? children : null;
};

export default Protected