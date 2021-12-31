export enum EventsMap {
	WINDOW_GET_FULLSCREEN_STATE = "windowGetFullScreenState",
	WINDOW_FULLSCREEN_TOGGLE = "windowFullScreenToggle",
	WINDOW_MINIMIZE = "windowMinimize",
	WINDOW_CLOSE = "windowClose",
}

export type EventsProps = {
	[EventsMap.WINDOW_GET_FULLSCREEN_STATE]: void;
	[EventsMap.WINDOW_FULLSCREEN_TOGGLE]: void;
	[EventsMap.WINDOW_MINIMIZE]: void;
	[EventsMap.WINDOW_CLOSE]: void;
};

export type EventsReturnValues = {
	[EventsMap.WINDOW_GET_FULLSCREEN_STATE]: boolean;
	[EventsMap.WINDOW_FULLSCREEN_TOGGLE]: void;
	[EventsMap.WINDOW_MINIMIZE]: void;
	[EventsMap.WINDOW_CLOSE]: void;
};
