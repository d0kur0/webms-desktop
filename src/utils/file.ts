import { Files } from "webm-finder";

import { SortingRules } from "types/browser/sortings";

export const isImage = (url: string) => {
	return ["jpeg", "png", "gif", "jpg"].includes(url.split(".").pop());
};

export const sortFilesByDateDesc = (files: Files) => {
	return files.sort((a, b) => {
		return b.date - a.date;
	});
};

export const sortFilesByDateAsc = (files: Files) => {
	return files.sort((a, b) => {
		return a.date - b.date;
	});
};

export const sortingByRules = (rules: SortingRules, files: Files): Files => {
	files = rules.date ? sortFilesByDateDesc(files) : sortFilesByDateAsc(files);
	return files;
};

export const getFileType = (fileUrl: string) => {
	return fileUrl.split(".").pop() || "unknown";
};
