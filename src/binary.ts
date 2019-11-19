import spawnAsync, { SpawnResult } from "./spawnAsync";

export const AGENT_BINARY = 'buildkite-agent';

export interface BinaryOptions {
    readonly binaryPath?: string;
}

export async function runBinary(args: string[]): Promise<SpawnResult> {
    try {
        return await spawnAsync(AGENT_BINARY, args);
    }
    catch (e) {
        const r = e as SpawnResult;
        console.log(r.stdout);
        console.log(r.stderr);
        throw e;
    }    
}