import { fetchApi } from "../api";
import { ClientConfiguration, shouldSkipCommand, resolveAndAssertComplete } from "../config";

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

function getInput(body: string, options?: AnnotateOptions): AnnotationJson {
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
    
    const config = resolveAndAssertComplete(options);

    const input = getInput(body, options);

    await annotateRest(config.jobId!, input, config);
}
