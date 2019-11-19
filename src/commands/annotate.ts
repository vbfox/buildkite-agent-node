import spawnAsync, { SpawnResult } from "../spawnAsync";
import { AGENT_BINARY } from "../consts";
import fetch from 'node-fetch';
export type AnnotationStyle = 'success' | 'info' | 'warning' | 'error';

export interface AnnotateOptions {
    readonly context?: string;
    readonly style?: AnnotationStyle;
    readonly append?: boolean;
}

export type AnnotateFunction =
    (body: string, options?: AnnotateOptions) => Promise<void>;

function getArgs(body: string, options?: AnnotateOptions): string[] {
    const args = ['annotate', body];
    if (options?.context) {
        args.push('--context');
        args.push(options.context);
    }
    if (options?.style) {
        args.push('--style');
        args.push(options.style);
    }
    if (options?.append) {
        args.push('--append');
    }
    return args;
}

export async function annotate(body: string, options?: AnnotateOptions) {
    const args = getArgs(body, options);

    try {
        await spawnAsync(AGENT_BINARY, args);
    }
    catch (e) {
        const r = e as SpawnResult;
        console.log(r.stdout);
        console.log(r.stderr);
    }
}

interface AnnotationJson {
    readonly body?: string;
    readonly context?: string;
    readonly style?: string;
    readonly append?: boolean;
}

function getJson(body: string, options?: AnnotateOptions): AnnotationJson {
    return {
        body,
        context: options?.context,
        style: options?.style,
        append: options?.append,
    };    
}

const defaultEndpoint: 'https://agent.buildkite.com/;'
const defaultUserAgent = 'buildkite-agent/api';

interface ClientConfiguration {
    readonly token: string;
    readonly endpoint: string;
    readonly userAgent: string;
}

async function fetchApi<TRequest, TResponse>(config: ClientConfiguration, method: 'GET' | 'POST', urlStr: string, body?: TRequest) : Promise<TResponse | undefined> {
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

export async function annotateRest(config: ClientConfiguration, jobId: string, annotation: AnnotationJson) {
    const url = `jobs/${jobId}/annotations`;
    await fetchApi<AnnotationJson, any>(config, 'POST', url, annotation);
}