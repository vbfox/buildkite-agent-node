import { ClientConfiguration } from "./config";
import fetch from 'node-fetch';
import * as VError from "verror";

export async function fetchApi<TRequest, TResponse>(
    config: ClientConfiguration,
    method: 'GET' | 'POST',
    urlStr: string,
    body?: TRequest) : Promise<TResponse | undefined> {
    if (config.agentAccessToken === undefined || config.endpoint === undefined) {
        throw new Error('Access token and endpoint need to be configured manually or via environment variables');
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

    try {
        const result = await fetch(
            url, {
            method,
            body: body === undefined ? undefined : JSON.stringify(body),
            headers,
        });
        
        if (result.ok && result.status === 200) {
            return (await result.json()) as TResponse;
        } else {
            throw new Error(`Request failed with ${result.status}: ${result.statusText}`);
        }
    } catch(error) {
        throw new VError(error, '%s request to Buildkite at \'%s\' failed', method, url);
    }
}