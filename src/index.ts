import { app, BrowserWindow } from "electron";
import "electron/events";
import { EventsMap } from "types/events";
import { invokeBrowserEvent } from "utils/eventEmitter";
import { mediaGetCache, mediaUpdate } from "utils/media";

if (require("electron-squirrel-startup")) {
	// eslint-disable-line global-require
	app.quit();
}

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const isDevelopment = !app.isPackaged;
const appLock = app.requestSingleInstanceLock();

const WINDOW_WIDTH = 1240;
const WINDOW_HEIGHT = 900;
const DEVTOOLS_WIDTH = 500;

let mainWindow: BrowserWindow = null;

const createWindow = (): void => {
	mainWindow = new BrowserWindow({
		frame: false,
		height: WINDOW_HEIGHT,
		width: isDevelopment ? WINDOW_WIDTH + DEVTOOLS_WIDTH : WINDOW_WIDTH,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
		callback({
			responseHeaders: {
				...details.responseHeaders,
				"Content-Security-Policy": ["media-src: 'self"],
			},
		});
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).catch(console.error);
	mainWindow.setMenu(null);

	isDevelopment && mainWindow.webContents.openDevTools();

	mainWindow.webContents.on("did-finish-load", function () {
		mediaGetCache().then(mediaCache => invokeBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, mediaCache.files));
		mediaUpdate().then(files => invokeBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, files));

		setInterval(() => {
			mediaUpdate().then(files => invokeBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, files));
		}, 1000 * 60 * 10);
	});
};

appLock || app.quit();

if (appLock) {
	app.on("second-instance", (event, commandLine) => {
		mainWindow.webContents.send("spotify-auth", commandLine);

		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}
	});

	app.whenReady().then(() => {
		createWindow();
	});
}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
