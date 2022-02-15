import { useStore } from "@nanostores/react";

import "./Preferences.css";

import React, { useEffect } from "react";

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

	useEffect(() => {
		invokeElectronEvent(EventsMap.MEDIA_GET_SETTINGS, null).then(settings =>
			setMediaSettings(settings)
		);
	}, []);

	return (
		<div className="preferences">
			<h2 className="preferences__title">Настройка досок</h2>

			<div className="checkboxes" key={0}>
				{settings?.allowedBoards.map(({ vendor, boards }) => (
					<ul className="checkbox">
						<li className="checkbox__name">{VENDOR_NAMES?.[vendor]}</li>
						{boards.map((board, key) => (
							<li key={key}>
								<button
									onClick={() => mediaSettingsToggleBoard(vendor, board.name)}
									className={`checkbox__value ${board.enabled ? "" : "checkbox__value--disabled"}`}>
									{board.name} - {board.description}
								</button>
							</li>
						))}
					</ul>
				))}
			</div>

			<h2 className="preferences__title">Настройка типов файлов</h2>

			<div className="checkboxes" key={1}>
				<ul className="checkbox">
					{settings?.allowedFileExtensions.map((extension, key) => (
						<li key={key}>
							<button
								onClick={() => mediaSettingsToggleExtension(extension.value)}
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
