import { Files } from "webm-finder";

export const isImage = (url: string) => {
	return ["jpeg", "png", "gif", "jpg"].includes(url.split(".").pop());
};

export const sortFilesByDate = (files: Files) => {
	return files.sort((a, b) => {
		return b.date - a.date;
	});
};

export const getFileType = (fileUrl: string) => {
	return fileUrl.split(".").pop() || "unknown";
};
