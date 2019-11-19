const defaultEndpoint = 'https://agent.buildkite.com/;'
const defaultUserAgent = 'buildkite-agent/api';

export interface ClientConfiguration {
    readonly token: string;
    readonly endpoint: string;
    readonly userAgent: string;
}

export async function fetchApi<TRequest, TResponse>(config: ClientConfiguration, method: 'GET' | 'POST', urlStr: string, body?: TRequest) : Promise<TResponse | undefined> {
    const url = config.endpoint + urlStr;
    const result = await fetch(
        url, {
        method,
        body: body === undefined ? undefined : JSON.stringify(body),
        headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    });
    if (result.ok) {
        return (await result.json()) as TResponse;
    }
}