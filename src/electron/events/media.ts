import { shell } from "electron";

import { EventsMap } from "types/events";

import { handleAsyncElectronEvent, handleElectronEvent } from "utils/eventEmitter";
import { mediaGetSettings, mediaSetSettings } from "utils/media";

handleElectronEvent(EventsMap.OPEN_SOURCE_THREAD, (_, url) => {
	shell.openExternal(url).catch(console.error);
});

handleAsyncElectronEvent(EventsMap.MEDIA_GET_SETTINGS, async () => {
	return await mediaGetSettings();
});

handleAsyncElectronEvent(EventsMap.MEDIA_SET_SETTINGS, async (_, settings) => {
	return await mediaSetSettings(settings);
});
