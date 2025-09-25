export interface HttpResponse<T> {
	ok: boolean;
	status: number;
	statusText: string;
	url: string;
	data: T;
}
const makeFetchRequest = async <T>(url: string, options: RequestInit): Promise<HttpResponse<T>> => {
    const response = await fetch(url, options);
    const data = await response.json() as T;

    return {
		ok: response.ok,
		status: response.status,
		statusText: response.statusText,
		url: response.url,
        data: data
    };
};

export const HttpService = {
    get: <T>(url: string, options: RequestInit = {}) => makeFetchRequest<T>(url, { ...options, method: 'GET' }),
    post: <T>(url: string, body: any, options: RequestInit = {}) => makeFetchRequest<T>(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: <T>(url: string, body: any, options: RequestInit = {}) => makeFetchRequest<T>(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(url: string, options: RequestInit = {}) => makeFetchRequest<T>(url, { ...options, method: 'DELETE' })
};