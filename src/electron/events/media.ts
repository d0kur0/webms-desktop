import { shell } from "electron";

import { EventsMap } from "types/events";

import { handleElectronEvent } from "utils/eventEmitter";

handleElectronEvent(EventsMap.OPEN_SOURCE_THREAD, (_, url) => {
	shell.openExternal(url).catch(console.error);
});
