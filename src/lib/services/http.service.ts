const makeFetchRequest = async <T>(url: string, options: RequestInit): Promise<Response & { data: T }> => {
    const response = await fetch(url, options);
    const data = await response.json() as T;

    return {
        ...response,
        data
    };
};

export const HttpService = {
    get: <T>(url: string, options: RequestInit = {}) => makeFetchRequest<T>(url, { ...options, method: 'GET' }),
    post: <T>(url: string, body: any, options: RequestInit = {}) => makeFetchRequest<T>(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: <T>(url: string, body: any, options: RequestInit = {}) => makeFetchRequest<T>(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(url: string, options: RequestInit = {}) => makeFetchRequest<T>(url, { ...options, method: 'DELETE' })
};