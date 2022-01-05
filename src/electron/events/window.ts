import { EventsMap } from "types/events";
import { handleElectronEvent } from "utils/eventEmitter";
import { getMainWindow } from "utils/getMainWindow";

handleElectronEvent(EventsMap.WINDOW_MINIMIZE, (event, args) => {
	getMainWindow().minimize();
});

handleElectronEvent(EventsMap.WINDOW_CLOSE, () => {
	getMainWindow().close();
});

handleElectronEvent(EventsMap.WINDOW_FULLSCREEN_TOGGLE, () => {
	const mainWindow = getMainWindow();
	mainWindow.setFullScreen(!mainWindow.isFullScreen());
});

handleElectronEvent(EventsMap.WINDOW_GET_FULLSCREEN_STATE, () => {
	return getMainWindow().isFullScreen();
});
