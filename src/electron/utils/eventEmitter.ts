import { ipcMain, ipcRenderer, IpcMainEvent } from "electron";
import { EventsMap, EventsProps, EventsReturnValues } from "types/events";

export function handleEvent<T extends EventsMap>(
	event: T,
	callback: (event: IpcMainEvent, props: EventsProps[T]) => EventsReturnValues[T]
): void {
	ipcMain.handle(event, callback);
}

export function invokeEvent<T extends EventsMap>(event: T, props: EventsProps[T]): Promise<EventsReturnValues[T]> {
	return ipcRenderer.invoke(event, props);
}
