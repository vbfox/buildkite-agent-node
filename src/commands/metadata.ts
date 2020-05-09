import { shouldSkipCommand, resolveConfig, assertConfigIsComplete, ClientConfiguration, resolveAndAssertComplete } from "../config";
import { fetchApi, FetchApiError } from "../api";

export interface MetaData {
	key: string
	value: string
}

interface MetaDataRequestJson {
	key: string
}

export interface GetMetatadaOptions extends ClientConfiguration {
}

function getMetadataRest(jobId: string, key: string, config: ClientConfiguration) {
    const url = `jobs/${jobId}/data/get`;
    const input: MetaDataRequestJson = { key };
    return fetchApi<MetaDataRequestJson, MetaData>(config, 'POST', url, input);
}

export async function getMetadata(key: string, options?: GetMetatadaOptions): Promise<string | undefined> {
    if (shouldSkipCommand(options)) {
        return;
    }
    
    const config = resolveAndAssertComplete(options);

    try {
        const metadata = await getMetadataRest(config.jobId!, key, config);
        return metadata.value;
    } catch (error) {
        if (error instanceof FetchApiError && error.result !== undefined && error.result.status == 404) {
            return undefined;
        }

        throw error;
    }
}

export interface SetMetatadaOptions extends ClientConfiguration {
}

function setMetadataRest(jobId: string, value: MetaData, config: ClientConfiguration) {
    const url = `jobs/${jobId}/data/set`;
    return fetchApi<MetaData, void>(config, 'POST', url, value);
}

export async function setMetadata(key: string, value: string, options?: SetMetatadaOptions): Promise<void> {
    if (shouldSkipCommand(options)) {
        return;
    }
    
    const config = resolveAndAssertComplete(options);

    await setMetadataRest(config.jobId!, { key, value }, config);
}

export interface MetatadaExistsOptions extends ClientConfiguration {
}

interface MetaDataExistsJson {
	exists: boolean
}

function metadataExistsRest(jobId: string, key: string, config: ClientConfiguration) {
    const url = `jobs/${jobId}/data/exists`;
    const input: MetaDataRequestJson = { key };
    return fetchApi<MetaDataRequestJson, MetaDataExistsJson>(config, 'POST', url, input);
}

export async function metadataExists(key: string, options?: MetatadaExistsOptions): Promise<boolean> {
    if (shouldSkipCommand(options)) {
        return false;
    }
    
    const config = resolveAndAssertComplete(options);

    const metadataExists = await metadataExistsRest(config.jobId!, key, config);
    return metadataExists.exists;
}

export interface GetMetatadaKeysOptions extends ClientConfiguration {
}

function getMetadataKeysRest(jobId: string, config: ClientConfiguration) {
    const url = `jobs/${jobId}/data/keys`;
    return fetchApi<void, string[]>(config, 'POST', url);
}

export async function getMetadataKeys(options?: GetMetatadaKeysOptions): Promise<string[]> {
    if (shouldSkipCommand(options)) {
        return [];
    }
    
    const config = resolveAndAssertComplete(options);

    return await getMetadataKeysRest(config.jobId!, config);
}
