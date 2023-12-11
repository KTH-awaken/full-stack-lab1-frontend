import { ReactNode } from 'react'
import { useOAuth2 } from '../context/oauth2-context';

const Protected = ({ children }: { children: ReactNode }) => {

    const { isAuthenticated } = useOAuth2();
    return isAuthenticated ? children : null;
};

export default Protected