import { EventsMap } from "types/events";
import { handleAsyncElectronEvent } from "utils/eventEmitter";
import { mediaGetCache } from "utils/media";

handleAsyncElectronEvent(EventsMap.MEDIA_GET_CACHE, async (event, args) => {
	return await mediaGetCache();
});
