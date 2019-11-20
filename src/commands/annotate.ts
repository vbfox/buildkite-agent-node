import { fetchApi } from "../api";
import { resolveConfig, assertConfigIsComplete, ClientConfiguration } from "../config";
import { isBuildkitePresent } from "../env";

export type AnnotationStyle = 'success' | 'info' | 'warning' | 'error';

export interface AnnotateOptions extends ClientConfiguration {
    readonly context?: string;
    readonly style?: AnnotationStyle;
    readonly append?: boolean;
}

export type AnnotateFunction =
    (body: string, options?: AnnotateOptions) => Promise<void>;


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

async function annotateRest(jobId: string, annotation: AnnotationJson, config: ClientConfiguration) {
    const url = `jobs/${jobId}/annotations`;
    await fetchApi<AnnotationJson, any>(config, 'POST', url, annotation);
}

export async function annotate(body: string, options?: AnnotateOptions) {
    if (!isBuildkitePresent()) {
        return;
    }
    
    const config = resolveConfig(options);
    assertConfigIsComplete(config);

    const json = getJson(body, options);

    await annotateRest(config.jobId!, json, config);
}