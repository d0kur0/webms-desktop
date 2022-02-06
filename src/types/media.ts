import { Files, VendorImplementation, fourChannelFactory, twoChannelFactory } from "webm-finder";

type EnabledBoardsStruct = {
	vendor: VendorImplementation;
	boards: string[];
}[];

export const EnabledBoards: EnabledBoardsStruct = [
	// { vendor: twoChannelFactory, boards: ["media"] },
	{ vendor: twoChannelFactory, boards: ["mu"] },
];

//export const AllowedFileExtensions = ["webm", "mp4", "jpeg", "jpg", "png", "gif"] as const;
export const AllowedFileExtensions = ["webm", "mp4"] as const;

export type MediaCache = {
	revisionTime: number;
	files: Files;
};
