import { EventsMap } from "types/events";

import { handleElectronEvent, invokeBrowserEvent } from "utils/eventEmitter";
import { mediaGetCache, mediaUpdate } from "utils/media";

handleElectronEvent(EventsMap.APP_READY, () => {
	mediaGetCache().then(mediaCache => {
		invokeBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, mediaCache.files);
		console.log("from cache", mediaCache.files.length);
	});

	mediaUpdate().then(files => {
		invokeBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, files);
		console.log("updated", files.length);
	});

	setInterval(() => {
		mediaUpdate().then(files => invokeBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, files));
	}, 1000 * 60 * 10);
});
