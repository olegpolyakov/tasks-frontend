import { useEffect, useMemo } from 'react';

import http, { HttpClient } from '@olegpolyakov/frontend/clients/http';

import { useAuthContext } from './auth';

export type ApiFactory<T> = (http: HttpClient) => T;

export function useApi<T>(apiFactory: ApiFactory<T>): T {
    const { accessToken } = useAuthContext();
    
    useEffect(() => {
        http.set('headers', {
            Authorization: `Bearer ${accessToken}`
        });
    }, [accessToken]);

    return useMemo(() => apiFactory(http), [apiFactory]);
}