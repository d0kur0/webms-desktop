import { app } from "electron";
import { JSONFile, Low } from "lowdb";
import path from "path";
import "polyfills/fetch";
import { Files, Thread, VendorImplementation } from "webm-finder";

import { EventsMap } from "types/events";
import { AllowedFileExtensions, EnabledBoards, MediaCache } from "types/media";

import { invokeBrowserEvent } from "utils/eventEmitter";

const mediaCacheFilePath = path.join(app.getPath("home"), "/.webms-desktop/mediaCache.json");
const MAX_FILES_CHUNK_SIZE = 30;

const vendorProps = { requiredFileTypes: [...AllowedFileExtensions] };

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

type ThreadsExtended = (Thread & { vendor: VendorImplementation })[];

export const mediaUpdate = async (): Promise<Files> => {
	invokeBrowserEvent(EventsMap.MEDIA_SEND_STATE, "startUpdate");
	const threadsQueue: Promise<ThreadsExtended>[] = [];

	for (let { vendor, boards } of EnabledBoards) {
		for (let board of boards) {
			threadsQueue.push(
				vendor(vendorProps)
					.fetchThreads(board)
					.then(threads => threads.map(thread => ({ ...thread, vendor })))
			);
		}
	}

	const threadsMap = await Promise.allSettled(threadsQueue);
	const threads: ThreadsExtended = [];

	for (let boardThreads of threadsMap.values()) {
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
