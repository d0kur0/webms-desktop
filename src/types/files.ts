export type AllowedFileExtensions = "webm" | "mp4" | "jpeg" | "jpg" | "png" | "gif";

export type File = {
	name: string;
	postUrl: string;
	threadUrl: string;
	extension: AllowedFileExtensions;
};
