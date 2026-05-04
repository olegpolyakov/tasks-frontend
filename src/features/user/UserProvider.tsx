import { useMemo } from 'react';

import UserContext from './UserContext';
import useUser from './useUser';

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const { user, error, isLoading } = useUser();

    const value = useMemo(() => ({ user: user! }), [user]);

    if (error) {
        return <div>{error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not authenticated</div>;
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}