import { atom } from "nanostores";
import { Files } from "webm-finder";

export const filesStore = atom<Files>([]);

export function setFiles(files: Files): void {
	filesStore.set(files);
}
