export enum EventsMap {
	OPEN_APP = "openApp",
	TEST = "test",
}

export type EventsProps = {
	[EventsMap.OPEN_APP]: void;
	[EventsMap.TEST]: string;
};

export type EventsReturnValues = {
	[EventsMap.OPEN_APP]: void;
	[EventsMap.TEST]: string[];
};
