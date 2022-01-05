import { ipcMain, ipcRenderer, IpcMainEvent, IpcRendererEvent } from "electron";
import { EventsMap, EventsProps, EventsReturnValues } from "types/events";
import { getMainWindow } from "utils/getMainWindow";

export function handleElectronEvent<T extends EventsMap>(
	event: T,
	callback: (event: IpcMainEvent, props: EventsProps[T]) => EventsReturnValues[T]
): void {
	ipcMain.handle(event, callback);
}

export function handleBrowserEvent<T extends EventsMap>(
	event: T,
	callback: (event: IpcRendererEvent, props: EventsProps[T]) => void
): void {
	ipcRenderer.on(event, callback);
}

export function handleAsyncElectronEvent<T extends EventsMap>(
	event: T,
	callback: (event: IpcMainEvent, props: EventsProps[T]) => Promise<EventsReturnValues[T]>
): void {
	ipcMain.handle(event, callback);
}

export function invokeElectronEvent<T extends EventsMap>(
	event: T,
	props: EventsProps[T]
): Promise<EventsReturnValues[T]> {
	return ipcRenderer.invoke(event, props);
}

export function invokeBrowserEvent<T extends EventsMap>(event: T, props: EventsProps[T]): void {
	getMainWindow().webContents.send(event, props);
}
