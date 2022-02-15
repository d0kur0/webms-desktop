import { atom } from "nanostores";

import { EventsMap } from "types/events";
import { MediaSettings } from "types/media";

import { invokeElectronEvent } from "utils/eventEmitter";

export const mediaSettingsStore = atom<MediaSettings | null>(null);

export function setMediaSettings(settings: MediaSettings): void {
	mediaSettingsStore.set(settings);
}

export const mediaSettingsToggleBoard = (vendor: string, boardName: string): void => {
	const settings = mediaSettingsStore.get();

	const allowedBoards = settings.allowedBoards.map(allowedBoard => {
		const boards = allowedBoard.boards.map(board =>
			board.name === boardName && allowedBoard.vendor === vendor
				? { ...board, enabled: !board.enabled }
				: board
		);
		return { ...allowedBoard, boards };
	});

	const newSettings = { ...settings, allowedBoards };
	mediaSettingsStore.set(newSettings);
	invokeElectronEvent(EventsMap.MEDIA_SET_SETTINGS, newSettings).then(void 0);
};

export const mediaSettingsToggleExtension = (extensionValue: string): void => {
	const settings = mediaSettingsStore.get();
	const allowedFileExtensions = settings.allowedFileExtensions.map(extension =>
		extension.value === extensionValue ? { ...extension, enabled: !extension.enabled } : extension
	);
	const newSettings = { ...settings, allowedFileExtensions };
	mediaSettingsStore.set(newSettings);
	invokeElectronEvent(EventsMap.MEDIA_SET_SETTINGS, newSettings).then(void 0);
};
