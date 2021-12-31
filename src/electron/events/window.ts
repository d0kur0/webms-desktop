import { EventsMap } from "types/events";
import { handleEvent } from "utils/eventEmitter";
import { getMainWindow } from "utils/getMainWindow";

handleEvent(EventsMap.WINDOW_MINIMIZE, (event, args) => {
	getMainWindow().minimize();
});

handleEvent(EventsMap.WINDOW_CLOSE, () => {
	getMainWindow().close();
});

handleEvent(EventsMap.WINDOW_FULLSCREEN_TOGGLE, () => {
	const mainWindow = getMainWindow();
	mainWindow.setFullScreen(!mainWindow.isFullScreen());
});

handleEvent(EventsMap.WINDOW_GET_FULLSCREEN_STATE, () => {
	return getMainWindow().isFullScreen();
});
