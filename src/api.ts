import { ClientConfiguration } from "./config";
import fetch from 'node-fetch';

export async function fetchApi<TRequest, TResponse>(
    config: ClientConfiguration,
    method: 'GET' | 'POST',
    urlStr: string,
    body?: TRequest) : Promise<TResponse | undefined> {
    if (config.agentAccessToken === undefined || config.endpoint === undefined) {
        throw new Error('Access token and endpoint need to be configured manually or via environment variables');
    }

    const url = config.endpoint + urlStr;
    const headers: any = {
        'User-Agent': config?.userAgent,
    }

    if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
    }

    const result = await fetch(
        url, {
        method,
        body: body === undefined ? undefined : JSON.stringify(body),
        headers,
    });
    if (result.ok) {
        return (await result.json()) as TResponse;
    }
}