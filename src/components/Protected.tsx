import { ReactNode } from "react";
import { Role, useOAuth2 } from "../context/oauth2-context";

const Protected = ({
    children,
    roles,
}: {
    children: ReactNode;
    roles?: Role[];
}) => {
    const { isAuthenticated, hasRole } = useOAuth2();

    const hasRequiredRole = roles
        ? roles.some((role: Role) => hasRole(role))
        : true;

    if (isAuthenticated && hasRequiredRole) {
        return children;
    }

    return null;
};

export default Protected;
