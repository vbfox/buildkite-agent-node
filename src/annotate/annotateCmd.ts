import spawnAsync, { SpawnResult } from "../spawnAsync";
import { AGENT_BINARY } from "../binary";
import fetch from 'node-fetch';
import { AnnotateOptions } from "./annotateTypes";

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

