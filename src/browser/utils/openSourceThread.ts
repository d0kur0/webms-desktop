import { EventsMap } from "types/events";

import { invokeElectronEvent } from "utils/eventEmitter";

export const openSourceThread = async (url: string) => {
	await invokeElectronEvent(EventsMap.OPEN_SOURCE_THREAD, url);
};
