import { Files } from "webm-finder";

export const EnabledBoards = ["media"] as const;
export const AllowedFileExtensions = ["webm", "mp4", "jpeg", "jpg", "png", "gif"] as const;

export type File = {
	name: string;
	postUrl: string;
	threadUrl: string;
	extension: typeof AllowedFileExtensions[number];
};

export type MediaCache = {
	revisionTime: number;
	files: Files;
};
