import spawnAsync, { SpawnResult } from './spawnAsync';
import { BuildKiteEnv, getEnv } from './env'
export type AnnotationStyle = 'success' | 'info' | 'warning' | 'error';

export interface AnnotateOptions {
    readonly context?: string;
    readonly style?: AnnotationStyle;
    readonly append?: boolean;
}

export async function annotate(body: string, options?: AnnotateOptions) {
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

    try {
        await spawnAsync('buildkite-agent', args);
    }
    catch (e) {
        const r = e as SpawnResult;
        console.log(r.stdout);
        console.log(r.stderr);
    }
}

export { BuildKiteEnv, getEnv };
