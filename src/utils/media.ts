import { app } from "electron";
import { JSONFile, Low } from "lowdb";
import path from "path";
import "polyfills/fetch";
import {
	Files,
	Thread,
	VendorImplementation,
	fourChannelFactory,
	twoChannelFactory,
} from "webm-finder";

import { EventsMap } from "types/events";
import {
	AllowedBoards,
	AllowedFileExtensions,
	EnabledBoardsStruct,
	MediaCache,
	MediaSettings,
} from "types/media";

import { invokeBrowserEvent } from "utils/eventEmitter";

type ThreadsExtended = (Thread & { vendor: VendorImplementation })[];

const mediaCacheFilePath = path.join(app.getAppPath(), "/mediaCache.json");
const mediaSettingsFilePath = path.join(app.getAppPath(), "/mediaSettings.json");

const MAX_FILES_CHUNK_SIZE = 30;

export const mediaGetCache = async (): Promise<MediaCache> => {
	const adapter = new JSONFile<MediaCache>(mediaCacheFilePath);
	const db = new Low<MediaCache>(adapter);
	await db.read();
	return db.data || { files: [], revisionTime: 0 };
};

export const mediaSetCache = async (files: Files): Promise<void> => {
	const adapter = new JSONFile<MediaCache>(mediaCacheFilePath);
	const db = new Low<MediaCache>(adapter);

	db.data = {
		revisionTime: Math.floor(Date.now() / 1000),
		files,
	};

	return await db.write();
};

export const mediaGetSettings = async (): Promise<MediaSettings> => {
	const adapter = new JSONFile<MediaSettings>(mediaSettingsFilePath);
	const db = new Low<MediaSettings>(adapter);
	await db.read();
	return (
		db.data || {
			allowedBoards: AllowedBoards.map(boards => ({
				...boards,
				vendor: boards.vendor.name as "twoChannelFactory" | "fourChannelFactory",
			})),
			allowedFileExtensions: AllowedFileExtensions,
		}
	);
};

export const mediaSetSettings = async (mediaSettings: MediaSettings): Promise<void> => {
	const adapter = new JSONFile<MediaSettings>(mediaSettingsFilePath);
	const db = new Low<MediaSettings>(adapter);
	db.data = mediaSettings;
	return await db.write();
};

export const mediaUpdate = async (): Promise<Files> => {
	invokeBrowserEvent(EventsMap.MEDIA_SEND_STATE, "startUpdate");

	const mediaSettings = await mediaGetSettings();
	const threadsQueue: Promise<ThreadsExtended>[] = [];
	const vendorProps = {
		requiredFileTypes: mediaSettings.allowedFileExtensions.filter(e => e.enabled).map(e => e.value),
	};

	const vendors = { twoChannelFactory, fourChannelFactory };
	const allowedBoards: EnabledBoardsStruct = mediaSettings.allowedBoards.map(board => ({
		...board,
		vendor: vendors[board.vendor],
	}));

	for (const { vendor, boards } of allowedBoards) {
		for (const { name, enabled } of boards) {
			if (!enabled) continue;
			threadsQueue.push(
				vendor(vendorProps)
					.fetchThreads(name)
					.then(threads => threads.map(thread => ({ ...thread, vendor })))
			);
		}
	}

	const threadsMap = await Promise.allSettled(threadsQueue);
	const threads: ThreadsExtended = [];

	for (const boardThreads of threadsMap.values()) {
		if (boardThreads.status == "rejected") continue;
		threads.push(...boardThreads.value);
	}

	const files: Files = [];
	const partialFetch = async (): Promise<void> => {
		if (!threads.length) return;

		const threadsChunk = threads.splice(0, MAX_FILES_CHUNK_SIZE);
		const queue = threadsChunk.map(({ vendor, ...thread }) =>
			vendor(vendorProps)
				.fetchFiles(thread)
				.then(fetchedFiles => {
					files.push(...fetchedFiles);
				})
		);

		await Promise.allSettled(queue);
		return await partialFetch();
	};

	await partialFetch();
	await mediaSetCache(files);

	invokeBrowserEvent(EventsMap.MEDIA_SEND_STATE, "endUpdate");
	return files;
};
