import { EventsMap } from "types/events";

import { handleAsyncElectronEvent, invokeBrowserEvent } from "utils/eventEmitter";
import { mediaGetCache, mediaUpdate } from "utils/media";

// 10m
const MEDIA_UPDATE_INTERVAL = 1000 * 60 * 10;

handleAsyncElectronEvent(EventsMap.APP_READY, async () => {
	const mediaCache = await mediaGetCache();
	invokeBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, mediaCache.files);

	const files = await mediaUpdate();
	invokeBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, files);

	setInterval(() => {
		mediaUpdate().then(files => invokeBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, files));
	}, MEDIA_UPDATE_INTERVAL);
});
