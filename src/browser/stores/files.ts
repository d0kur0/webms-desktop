import { atom } from "nanostores";
import { Files } from "webm-finder";

export const filesStore = atom<Files>([]);

export function setFiles(newFiles: Files) {
	filesStore.set([...filesStore.get(), ...newFiles]);
}
