import { fetchApi } from "../api";
import { resolveConfig, assertConfigIsComplete, ClientConfiguration, shouldSkipCommand } from "../config";

export enum AnnotationStyle {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
}

export interface AnnotateOptions extends ClientConfiguration {
    readonly context?: string;
    readonly style?: AnnotationStyle;
    readonly append?: boolean;
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

function annotateRest(jobId: string, annotation: AnnotationJson, config: ClientConfiguration) {
    const url = `jobs/${jobId}/annotations`;
    return fetchApi<AnnotationJson, any>(config, 'POST', url, annotation);
}

export async function annotate(body: string, options?: AnnotateOptions): Promise<void> {
    if (shouldSkipCommand(options)) {
        return;
    }
    
    const config = resolveConfig(options);
    assertConfigIsComplete(config);

    const json = getJson(body, options);

    await annotateRest(config.jobId!, json, config);
}