import { useStore } from "@nanostores/react";

import "./Preferences.css";

import React, { useEffect, useState } from "react";

import { EventsMap } from "types/events";

import {
	mediaSettingsStore,
	mediaSettingsToggleBoard,
	mediaSettingsToggleExtension,
	setMediaSettings,
} from "stores/settings";

import { invokeElectronEvent } from "utils/eventEmitter";

const VENDOR_NAMES = {
	twoChannelFactory: "Двач",
	fourChannelFactory: "Форч",
};

export default function Preferences(): JSX.Element {
	const settings = useStore(mediaSettingsStore);
	const [isChanged, setIsChanged] = useState(false);

	useEffect(() => {
		invokeElectronEvent(EventsMap.MEDIA_GET_SETTINGS, null).then(settings =>
			setMediaSettings(settings)
		);
	}, []);

	const onToggleBoard = (vendor: string, boardName: string) => {
		mediaSettingsToggleBoard(vendor, boardName);
		setIsChanged(true);
	};

	const onToggleExtension = (extension: string) => {
		mediaSettingsToggleExtension(extension);
		setIsChanged(true);
	};

	const requestUpdate = () => {
		invokeElectronEvent(EventsMap.MEDIA_REQUEST_UPDATE, void 1).catch(console.error);
		setIsChanged(false);
	};

	return (
		<div className="preferences">
			{isChanged && (
				<button className="update-button" onClick={requestUpdate}>
					Обновить файлы
				</button>
			)}

			<h2 className="preferences__title" key="boards">
				Настройка досок
			</h2>

			<div className="checkboxes" key={0}>
				{settings?.allowedBoards.map(({ vendor, boards }) => (
					<ul className="checkbox">
						<li className="checkbox__name">{VENDOR_NAMES?.[vendor]}</li>
						{boards.map((board, key) => (
							<li key={key}>
								<button
									onClick={() => onToggleBoard(vendor, board.name)}
									className={`checkbox__value ${board.enabled ? "" : "checkbox__value--disabled"}`}>
									{board.name} - {board.description}
								</button>
							</li>
						))}
					</ul>
				))}
			</div>

			<h2 className="preferences__title" key="file-types">
				Настройка типов файлов
			</h2>

			<div className="checkboxes" key={1}>
				<ul className="checkbox">
					{settings?.allowedFileExtensions.map((extension, key) => (
						<li key={key}>
							<button
								onClick={() => onToggleExtension(extension.value)}
								className={`checkbox__value ${
									extension.enabled ? "" : "checkbox__value--disabled"
								}`}>
								{extension.value}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
