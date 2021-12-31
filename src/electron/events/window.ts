import { BrowserWindow } from "electron";
import { EventsMap } from "types/events";
import { handleEvent } from "utils/eventEmitter";

handleEvent(EventsMap.WINDOW_MINIMIZE, (event, args) => {
	BrowserWindow.getFocusedWindow().minimize();
});

handleEvent(EventsMap.WINDOW_CLOSE, () => {
	BrowserWindow.getFocusedWindow().close();
});

handleEvent(EventsMap.WINDOW_FULLSCREEN_TOGGLE, () => {
	BrowserWindow.getFocusedWindow().setFullScreen(!BrowserWindow.getFocusedWindow().isFullScreen());
});

handleEvent(EventsMap.WINDOW_GET_FULLSCREEN_STATE, () => {
	return BrowserWindow.getFocusedWindow().isFullScreen();
});
