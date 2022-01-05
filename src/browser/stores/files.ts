import { atom } from "nanostores";
import { File } from "types/media";

export const files = atom<File[]>([]);

export function addFile(file: File) {
	files.set([...files.get(), file]);
}
