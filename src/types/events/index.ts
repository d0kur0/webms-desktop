import { MediaCache } from "types/media";
import { Files } from "webm-finder";

export enum EventsMap {
	WINDOW_GET_FULLSCREEN_STATE = "windowGetFullScreenState",
	WINDOW_FULLSCREEN_TOGGLE = "windowFullScreenToggle",
	WINDOW_MINIMIZE = "windowMinimize",
	WINDOW_CLOSE = "windowClose",

	MEDIA_GET_CACHE = "mediaGetCache",
	MEDIA_SEND_UPDATED_FILES = "mediaSendUpdatedFiles",
}

export type EventsProps = {
	[EventsMap.WINDOW_GET_FULLSCREEN_STATE]: void;
	[EventsMap.WINDOW_FULLSCREEN_TOGGLE]: void;
	[EventsMap.WINDOW_MINIMIZE]: void;
	[EventsMap.WINDOW_CLOSE]: void;

	[EventsMap.MEDIA_GET_CACHE]: void;
	[EventsMap.MEDIA_SEND_UPDATED_FILES]: Files;
};

export type EventsReturnValues = {
	[EventsMap.WINDOW_GET_FULLSCREEN_STATE]: boolean;
	[EventsMap.WINDOW_FULLSCREEN_TOGGLE]: void;
	[EventsMap.WINDOW_MINIMIZE]: void;
	[EventsMap.WINDOW_CLOSE]: void;

	[EventsMap.MEDIA_GET_CACHE]: MediaCache;
	[EventsMap.MEDIA_SEND_UPDATED_FILES]: Files;
};
