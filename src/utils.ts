import type { file, folder } from './interfaces';

export function getAllExceptMd(allFolders: folder[], allFiles: file[]): { [path: string]: file | folder } {
	const allExceptMd: { [path: string]: file | folder } = {};

	for (const folder of allFolders) {
		allExceptMd[folder.relativePath] = folder;
	}

	for (const TAFile of allFiles) {
		// The basename is the name without the extension
		if (TAFile.name.slice(-3) !== '.md') {
			allExceptMd[TAFile.relativePath] = TAFile;
		}
	}
	return allExceptMd;
}
