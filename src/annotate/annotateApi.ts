import { AnnotateOptions } from "./annotateTypes";
import { ClientConfiguration, fetchApi } from "../api";

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

export async function annotateRest(config: ClientConfiguration, jobId: string, annotation: AnnotationJson) {
    const url = `jobs/${jobId}/annotations`;
    await fetchApi<AnnotationJson, any>(config, 'POST', url, annotation);
}