import { ClientConfiguration } from "../config";
import { v4 } from 'node-uuid';

interface ArtifactJson {
	// The path to the artifact relative to the working directory
	path: string;

	// The absolute path to the artifact
	absolute_path: string;

	// The glob path used to find this artifact
	glob_path: string;

	// The size of the file in bytes
	file_size: number;

	// A Sha1Sum calculation of the file
	sha1sum: string;

	// The HTTP url to this artifact once it's been uploaded
	url: string | undefined;

	// The destination specified on the command line when this file was
	// uploaded
	upload_destination: string | undefined;
}

interface ArtifactBatchJson {
	id: string;
	artifacts: ArtifactJson[];
	upload_destination: string;
}

interface ArtifactUploadInstructionsAction {
    url: string;
    method: string;
    path: string;
    file_input: string;
}

interface UploadInstructionsJson {
    data: Record<string, string>;
    action: ArtifactUploadInstructionsAction;
}

interface ArtifactBatchCreateResponseJson {
	id: string;
	artifact_ids: string[];
	upload_instructions: UploadInstructionsJson[];
}

export interface UploadArtifactsOptions extends ClientConfiguration {
    readonly contentType?: string;
    readonly rootDir?: string;
}

export async function uploadArtifacts(pattern: string | string[], options?: UploadArtifactsOptions) {

}
