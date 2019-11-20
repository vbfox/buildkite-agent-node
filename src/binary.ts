import spawnAsync, { SpawnResult } from "./spawnAsync";
import { ClientConfiguration } from "./config";

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

export function getClientConfigurationArgs(config?: ClientConfiguration): readonly string[] {
    const args = [];
    if (config?.agentAccessToken) {
        args.push('--agent-access-token');
        args.push(config.agentAccessToken);
    }
    if (config?.endpoint) {
        args.push('--endpoint');
        args.push(config.endpoint);
    }
    if (config?.jobId) {
        args.push('--job');
        args.push(config.jobId);
    }
    return args;
}