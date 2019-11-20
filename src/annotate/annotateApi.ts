import { AnnotateOptions } from "./annotateTypes";
import { fetchApi } from "../api";
import { resolveConfig, assertConfigIsComplete, ClientConfiguration } from "../config";
import { isBuildKitePresent } from "../env";

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

export async function annotateApi(body: string, options?: AnnotateOptions) {
    if (!isBuildKitePresent()) {
        return;
    }
    
    const config = resolveConfig(options);
    assertConfigIsComplete(config);

    const json = getJson(body, options);

    await annotateRest(config.jobId!, json, config);
}