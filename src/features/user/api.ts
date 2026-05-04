import http from '@/shared/http';

export function authenticate(): Promise<{token: string}> {
    return http.get<{token: string}>('http://localhost:3000/authenticate');
}