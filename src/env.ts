export interface BuildKiteEnv {
    /** Get if BuildKite is present */
    isPresent: boolean;
    /** The agent session token for the job */
    agentAccessToken?: string;
    /** The value of the debug agent configuration option */
    debug?: boolean;
    /** The value of the endpoint agent configuration option */
    agentEndpoint?: string;
    /** A list of the experimental agent features that are currently enabled. */
    experiments?: readonly string [];
    agentId?: string;
    /** The name of the agent that ran the job */
    agentName?: string;
    artifactsPaths?: string;
    branch?: string;
    buildCreator?: string;
    buildCreatorEmail?: string;
    buildId?: string;
    buildNumber?: number;
    buildUrl?: string;
    command?: string;
    commit?: string;
    jobId?: string;
    label?: string;
    message?: string;
    organizationSlug?: string;
    pipelineDefaultBranch?: string;
    pipelineId?: string;
    pipelineProvider?: string;
    pipelineSlug?: string;
    pullRequest?: boolean;
    pullRequestBaseBranch?: string;
    pullRequestRepo?: string;
    rebuiltFromBuildId?: string;
    rebuiltFromBuildNumber?: number;
    repo?: string;
    repoSshHost?: string;
    retryCount?: number;
    source?: string;
    stepId?: string;
    stepKey?: string;
    tag?: string;
    timeout?: boolean;
    triggeredFromBuildId?: string;
    triggeredFromBuildNumber?: string;
    triggeredFromBuildPipeline?: string;
}

function getEnvString(key: string) {
    const value = process.env[key];
    return value && value !== '' ? value : undefined;
}

function getEnvBoolean(key: string) {
    const stringValue = getEnvString(key);
    if (stringValue === undefined) {
        return undefined;
    }

    switch(stringValue.toLowerCase()) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return undefined;
    }
}

function getEnvNumber(key: string) {
    const stringValue = getEnvString(key);
    if (stringValue === undefined) {
        return undefined;
    }

    const value = parseInt(stringValue);
    return value === NaN ? undefined : value;
}

function getEnvList(key: string): readonly string[] | undefined {
    const stringValue = getEnvString(key);
    if (stringValue === undefined) {
        return undefined;
    }

    return stringValue.split(',');
}

function getFromEnv(): BuildKiteEnv {
    return {
        isPresent: getEnvBoolean('BUILDKITE') || false,
        agentAccessToken: getEnvString('BUILDKITE_AGENT_ACCESS_TOKEN'),
        debug: getEnvBoolean('BUILDKITE_AGENT_DEBUG'),
        agentEndpoint: getEnvString('BUILDKITE_AGENT_ENDPOINT'),
        experiments: getEnvList('BUILDKITE_AGENT_EXPERIMENT'),
        agentId: getEnvString('BUILDKITE_AGENT_ID'),
        agentName: getEnvString('BUILDKITE_AGENT_NAME'),
        artifactsPaths: getEnvString('BUILDKITE_ARTIFACT_PATHS'),
        branch: getEnvString('BUILDKITE_BRANCH'),
        buildCreator: getEnvString('BUILDKITE_BUILD_CREATOR'),
        buildCreatorEmail: getEnvString('BUILDKITE_BUILD_CREATOR_EMAIL'),
        buildId: getEnvString('BUILDKITE_BUILD_ID'),
        buildNumber: getEnvNumber('BUILDKITE_BUILD_NUMBER'),
        buildUrl: getEnvString('BUILDKITE_BUILD_URL'),
        command: getEnvString('BUILDKITE_COMMAND'),
        commit: getEnvString('BUILDKITE_COMMIT'),
        jobId: getEnvString('BUILDKITE_JOB_ID'),
        label: getEnvString('BUILDKITE_LABEL'),
        message: getEnvString('BUILDKITE_MESSAGE'),
        organizationSlug: getEnvString('BUILDKITE_ORGANIZATION_SLUG'),
        pipelineDefaultBranch: getEnvString('BUILDKITE_PIPELINE_DEFAULT_BRANCH'),
        pipelineId: getEnvString('BUILDKITE_PIPELINE_ID'),
        pipelineProvider: getEnvString('BUILDKITE_PIPELINE_PROVIDER'),
        pipelineSlug: getEnvString('BUILDKITE_PIPELINE_SLUG'),
        pullRequest: getEnvBoolean('BUILDKITE_PULL_REQUEST'),
        pullRequestBaseBranch: getEnvString('BUILDKITE_PULL_REQUEST_BASE_BRANCH'),
        pullRequestRepo: getEnvString('BUILDKITE_PULL_REQUEST_REPO'),
        rebuiltFromBuildId: getEnvString('BUILDKITE_REBUILT_FROM_BUILD_ID'),
        rebuiltFromBuildNumber: getEnvNumber('BUILDKITE_REBUILT_FROM_BUILD_NUMBER'),
        repo: getEnvString('BUILDKITE_REPO'),
        repoSshHost: getEnvString('BUILDKITE_REPO_SSH_HOST'),
        retryCount: getEnvNumber('BUILDKITE_RETRY_COUNT'),
        source: getEnvString('BUILDKITE_SOURCE'),
        stepId: getEnvString('BUILDKITE_STEP_ID'),
        stepKey: getEnvString('BUILDKITE_STEP_KEY'),
        tag: getEnvString('BUILDKITE_TAG'),
        timeout: getEnvBoolean('BUILDKITE_TIMEOUT'),
        triggeredFromBuildId: getEnvString('BUILDKITE_TRIGGERED_FROM_BUILD_ID'),
        triggeredFromBuildNumber: getEnvString('BUILDKITE_TRIGGERED_FROM_BUILD_NUMBER'),
        triggeredFromBuildPipeline: getEnvString('BUILDKITE_TRIGGERED_FROM_BUILD_PIPELINE_SLUG'),
    }
}

let environmentCache : BuildKiteEnv | undefined;

export function getEnv() : BuildKiteEnv {
    if (environmentCache === undefined) {
        environmentCache = getFromEnv();
    }
    return environmentCache;
}