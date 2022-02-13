import { Files } from "webm-finder";

import { MediaCache, MediaSettings } from "types/media";

export enum EventsMap {
	WINDOW_GET_FULLSCREEN_STATE = "windowGetFullScreenState",
	WINDOW_FULLSCREEN_TOGGLE = "windowFullScreenToggle",
	WINDOW_MINIMIZE = "windowMinimize",
	WINDOW_CLOSE = "windowClose",

	MEDIA_SEND_UPDATED_FILES = "mediaSendUpdatedFiles",
	MEDIA_SEND_STATE = "mediaSendState",
	MEDIA_GET_SETTINGS = "mediaGetSettings",
	MEDIA_SET_SETTINGS = "mediaSetSettings",

	APP_READY = "appReady",

	OPEN_SOURCE_THREAD = "openSourceThread",
}

export type EventsProps = {
	[EventsMap.WINDOW_GET_FULLSCREEN_STATE]: void;
	[EventsMap.WINDOW_FULLSCREEN_TOGGLE]: void;
	[EventsMap.WINDOW_MINIMIZE]: void;
	[EventsMap.WINDOW_CLOSE]: void;

	[EventsMap.MEDIA_SEND_UPDATED_FILES]: Files;
	[EventsMap.MEDIA_SEND_STATE]: "startUpdate" | "endUpdate";
	[EventsMap.MEDIA_GET_SETTINGS]: void;
	[EventsMap.MEDIA_SET_SETTINGS]: MediaSettings;

	[EventsMap.APP_READY]: void;

	[EventsMap.OPEN_SOURCE_THREAD]: string;
};

export type EventsReturnValues = {
	[EventsMap.WINDOW_GET_FULLSCREEN_STATE]: boolean;
	[EventsMap.WINDOW_FULLSCREEN_TOGGLE]: void;
	[EventsMap.WINDOW_MINIMIZE]: void;
	[EventsMap.WINDOW_CLOSE]: void;

	[EventsMap.MEDIA_SEND_UPDATED_FILES]: Files;
	[EventsMap.MEDIA_SEND_STATE]: void;
	[EventsMap.MEDIA_GET_SETTINGS]: MediaSettings;
	[EventsMap.MEDIA_SET_SETTINGS]: void;

	[EventsMap.APP_READY]: void;

	[EventsMap.OPEN_SOURCE_THREAD]: void;
};
