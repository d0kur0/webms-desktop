import { app } from "electron";
import { JSONFile, Low } from "lowdb";
import path from "path";
import { AllowedFileExtensions, EnabledBoards, MediaCache } from "types/media";
import { twoChannelFactory } from "webm-finder";

const mediaCacheFilePath = path.join(app.getPath("home"), "/.webms-desktop/mediaCache.json");
const twoChannel = twoChannelFactory({ requiredFileTypes: [...AllowedFileExtensions] });

export const mediaGetCache = async (): Promise<MediaCache> => {
	const adapter = new JSONFile<MediaCache>(mediaCacheFilePath);
	const db = new Low<MediaCache>(adapter);
	await db.read();
	return db.data;
};

export const mediaUpdate = async (): Promise<void> => {
	const threadsQueue = [];

	for (let board of EnabledBoards) {
		threadsQueue.push(twoChannel.fetchThreads(board));
	}

	const threads = await Promise.allSettled(threadsQueue);
	console.log(threads);
};
