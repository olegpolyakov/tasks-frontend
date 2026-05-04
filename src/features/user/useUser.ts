import { useEffect, useState } from 'react';

import { authenticate } from './api';
import type { User } from './types';

export default function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        authenticate().then(user => {
            setUser(user);
            setLoading(false);
        }).catch((error: { message: string }) => {
            console.error('Authentication error:', error.message);
            setError(`Authentication error: ${error.message}`);
            setLoading(false);
        });
    }, []);

    return { user, error, isLoading };
}