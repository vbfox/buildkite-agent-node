import { ClientConfiguration } from "./config";
import fetch, { Response } from 'node-fetch';

export class FetchApiError extends Error {
    readonly cause?: any;
    readonly result?: Response;

    constructor(message: string, cause?: any, result?: Response) {
        super(message);
        this.name = 'FetchError';
        this.cause = cause;
        this.result = result;
    }
}

export async function fetchApi<TRequest, TResponse>(
    config: ClientConfiguration,
    method: 'GET' | 'POST',
    urlStr: string,
    body?: TRequest) : Promise<TResponse> {
    if (config.agentAccessToken === undefined || config.endpoint === undefined) {
        throw new FetchApiError('Access token and endpoint need to be configured manually or via environment variables');
    }

    const additionalSlash = config.endpoint.endsWith('/') ? '' : '/';
    const url = config.endpoint + additionalSlash + urlStr;
    const headers: any = {
        'User-Agent': config.userAgent,
        'Authorization': 'Token ' + config.agentAccessToken
    }

    if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
    }

    let result: Response;

    try {
        result = await fetch(
            url, {
            method,
            body: body === undefined ? undefined : JSON.stringify(body),
            headers,
        });
    } catch(error) {
        throw new FetchApiError(`${method} request to Buildkite at \'${url}\' failed: ${error.message}`, error);
    }

    if (result.ok && result.status === 200) {
        try {
            const json = await result.json();
            return json as TResponse;
        } catch (error) {
            throw new FetchApiError(`${method} request to Buildkite at \'${url}\' failed `
            + `during json(): ${error.message}`,error, result);
        }
    } else {
        throw new FetchApiError(
            `${method} request to Buildkite at \'${url}\' failed with non 200 result: `
            + `${result.status} ${result.statusText}`,
            undefined,
            result);
    }
}
