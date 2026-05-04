export async function get<T>(url: string, options?: RequestInit): Promise<T> {
    return fetch(url, {
        credentials: 'include',
        ...options
    }).then<T>(handleResponse);
}

export async function post<TReq, TRes>(url: string, data: TReq, options?: RequestInit): Promise<TRes> {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include',
        ...options
    }).then<TRes>(handleResponse);
}

export async function put<TReq, TRes>(url: string, data: TReq, options?: RequestInit): Promise<TRes> {
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include',
        ...options
    }).then<TRes>(handleResponse);
}

export async function patch<TReq, TRes>(url: string, data: TReq, options?: RequestInit): Promise<TRes> {
    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include',
        ...options
    }).then<TRes>(handleResponse);
}

export async function del<T>(url: string, options?: RequestInit): Promise<T> {
    return fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: options?.body ? {
            'Content-Type': 'application/json'
        } : undefined,
        ...options
    }).then<T>(handleResponse);
}

function handleResponse<T>(res: Response): Promise<T> {
    const contentType = res.headers.get('Content-Type') || '';

    if (res.ok) {
        if (contentType.includes('application/json')) {
            return res.json() as Promise<T>;
        } else {
            return res.text() as unknown as Promise<T>;
        }
    } else {
        if (contentType.includes('application/json')) {
            return res.json().then(err => {
                throw err;
            });
        } else {
            return res.text().then(text => {
                throw new Error(text);
            });
        }
    }
}

export default {
    get,
    post,
    put,
    patch,
    delete: del
};