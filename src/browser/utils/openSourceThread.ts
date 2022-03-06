import { EventsMap } from "types/events";

import { invokeElectronEvent } from "utils/eventEmitter";

export const openSourceThread = async (url: string): Promise<void> => {
	await invokeElectronEvent(EventsMap.OPEN_SOURCE_THREAD, url);
};
