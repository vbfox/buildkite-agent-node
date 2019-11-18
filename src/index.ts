import spawnAsync from './spawnAsync';

export type AnnotationStyle = 'success' | 'info' | 'warning' | 'error';

export interface AnnotateOptions {
    readonly context?: string;
    readonly style?: AnnotationStyle;
    readonly append?: boolean;
}

export async function annotate(body: string, options?: AnnotateOptions) {
    const args = [body];
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

    await spawnAsync('buildkite-agent', args);
}
