import { Files } from "webm-finder";

export const isImage = (url: string) => {
	return ["jpeg", "png", "gif", "jpg"].includes(url.split(".").pop());
};

export const sortByBoardAndName = (files: Files) => {
	return files
		.sort((a, b) => {
			return a.rootThread.board.localeCompare(b.rootThread.board);
		})
		.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
};
