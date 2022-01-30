import { BrowserWindow, app, session } from "electron";

import "electron/events";

// eslint-disable-line global-require
if (require("electron-squirrel-startup")) {
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
	app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

	mainWindow = new BrowserWindow({
		frame: false,
		height: WINDOW_HEIGHT,
		width: isDevelopment ? WINDOW_WIDTH + DEVTOOLS_WIDTH : WINDOW_WIDTH,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: false,
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

	const filter = {
		urls: ["https://*.github.com/*", "https://*.4cdn.org/*"],
	};

	session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
		callback({ requestHeaders: {} });
	});
};

appLock || app.quit();

if (appLock) {
	app.on("second-instance", () => {
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
