import { getBuildkiteEnv, isBuildkitePresent } from "./env";

const defaultEndpoint = 'https://agent.buildkite.com/v3';
const defaultUserAgent = 'buildkite-agent/api';

export interface ClientConfiguration {
    readonly agentAccessToken?: string;
    readonly endpoint?: string;
    readonly userAgent?: string;
    readonly jobId?: string;
}

export function assertConfigIsComplete(config: ClientConfiguration) {
    if (config.agentAccessToken === undefined || config.agentAccessToken === '') {
        throw new Error('No agent access token can be found. It can be passed explicitly '
        + 'or in the BUILDKITE_AGENT_ACCESS_TOKEN environment variable.');
    }
    if (config.endpoint === undefined || config.endpoint === '') {
        throw new Error('No endpoint URL can be found. It can be passed explicitly '
        + 'or in the BUILDKITE_AGENT_ENDPOINT environment variable.');
    }
    if (config.jobId === undefined || config.jobId === '') {
        throw new Error('No job ID can be found. It can be passed explicitly '
        + 'or in the BUILDKITE_JOB_ID environment variable.');
    }

}

function getEnvConfig(): ClientConfiguration {
    const env = getBuildkiteEnv();
    return {
        agentAccessToken: env.isPresent ? env.agentAccessToken : undefined,
        endpoint: env.agentEndpoint || defaultEndpoint,
        userAgent: defaultUserAgent,
        jobId: env.jobId
    }
}

export function resolveConfig(config: ClientConfiguration | undefined): ClientConfiguration {
    return { ...getEnvConfig(), ...config };
}

export function resolveAndAssertComplete(config: ClientConfiguration | undefined): ClientConfiguration {
    const resolved = resolveConfig(config);
    assertConfigIsComplete(resolved);
    return resolved;
}

export function shouldSkipCommand(config: ClientConfiguration | undefined) {
    if (config && config.agentAccessToken && config.agentAccessToken !== '') {
        return false;
    }

    if (isBuildkitePresent()) {
        return false;
    }

    return true;
}
