import { ClientConfiguration } from "..";
import { fetchApi } from "../api";
import { shouldSkipCommand, resolveAndAssertComplete } from "../config";
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { v4 as uuidv4 } from 'uuid'
import YAML from 'yaml';

interface Pipeline {
	readonly uuid: string,
	readonly pipeline: any,
	readonly replace: boolean
}

export interface UploadPipelineOptions extends ClientConfiguration {
    readonly filePath?: string;
    readonly replace?: boolean;
}

const possiblePaths = [
    "buildkite.yml",
    "buildkite.yaml",
    "buildkite.json",
    ".buildkite/pipeline.yml",
    ".buildkite/pipeline.yaml",
    ".buildkite/pipeline.json",
    "buildkite/pipeline.yml",
    "buildkite/pipeline.yaml",
    "buildkite/pipeline.json",
];

async function fileIsReadable(p: string) : Promise<boolean> {
    try {
        await fs.promises.access(p, fs.constants.R_OK);
        return true;
    } catch {
        return false;
    }
}

async function getExistingPipelines(cwd: string): Promise<string[]> {
    const result = [];
    for (const p of possiblePaths.map(p => path.resolve(cwd, p))) {
        if (await fileIsReadable(p)) {
            result.push(p);
        }
    }
    return result;
}

async function getPipelinePath(options: UploadPipelineOptions): Promise<string> {
    if (options.filePath !== undefined) {
        const fullPath = path.resolve(options.filePath);
        if (await fileIsReadable(fullPath)) {
            return fullPath;
        } else {
            throw new Error(`Unable to find configured pipeline '${fullPath}'`)
        }
    } else {
        const cwd = process.cwd();
        const existing = await getExistingPipelines(cwd);
        if (existing.length > 1) {
            const joined = existing.join(', ');
            throw new Error(`Found multiple configuration files: ${joined}. Please only have 1 configuration file present.`)
        }
        if (existing.length === 0) {
            const joined = possiblePaths.map(p => path.resolve(cwd, p)).join(', ');
            throw new Error(`Could not find a default pipeline configuration file in the known paths: ${joined}.`);
        }
        return existing[0];
    }
}

function updloadPipelineRest(jobId: string, value: Pipeline, config: ClientConfiguration) {
    const url = `jobs/${jobId}/pipelines`;
    return fetchApi<Pipeline, void>(config, 'POST', url, value);
}

export async function uploadPipeline(options?: UploadPipelineOptions): Promise<void> {
    if (shouldSkipCommand(options)) {
        return;
    }
    
    const config = resolveAndAssertComplete(options);

    const pipelinePath = await getPipelinePath(options || {});
    const pipelineText = await fs.promises.readFile(pipelinePath, { encoding: 'utf-8' });
    const pipelineJs = YAML.parse(pipelineText);

    const pipeline: Pipeline = {
        uuid: uuidv4(),
        pipeline: pipelineJs,
        replace: options?.replace || false,
    }

    await updloadPipelineRest(config.jobId!, pipeline, config);
}
