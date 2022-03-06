import { shell } from "electron";

import { EventsMap } from "types/events";

import {
	handleAsyncElectronEvent,
	handleElectronEvent,
	invokeBrowserEvent,
} from "utils/eventEmitter";
import { mediaGetSettings, mediaSetSettings, mediaUpdate } from "utils/media";

handleElectronEvent(EventsMap.OPEN_SOURCE_THREAD, (_, url) => {
	shell.openExternal(url).catch(console.error);
});

handleAsyncElectronEvent(EventsMap.MEDIA_GET_SETTINGS, async () => {
	return await mediaGetSettings();
});

handleAsyncElectronEvent(EventsMap.MEDIA_SET_SETTINGS, async (_, settings) => {
	return await mediaSetSettings(settings);
});

handleAsyncElectronEvent(EventsMap.MEDIA_REQUEST_UPDATE, async () => {
	invokeBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, await mediaUpdate());
});
