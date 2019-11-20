import { ClientConfiguration } from "../config";

export type AnnotationStyle = 'success' | 'info' | 'warning' | 'error';

export interface AnnotateOptions extends ClientConfiguration {
    readonly context?: string;
    readonly style?: AnnotationStyle;
    readonly append?: boolean;
}

export type AnnotateFunction =
    (body: string, options?: AnnotateOptions) => Promise<void>;
