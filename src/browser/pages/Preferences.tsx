import "./Preferences.css";

import React, { useEffect, useState } from "react";

import { EventsMap } from "types/events";
import { MediaSettings } from "types/media";

import { invokeElectronEvent } from "utils/eventEmitter";

const VENDOR_NAMES = {
	twoChannelFactory: "Двач",
	fourChannelFactory: "Форч",
};

export default function Preferences() {
	const [settings, setSettings] = useState<MediaSettings>({
		allowedFileExtensions: [],
		allowedBoards: [],
	});

	useEffect(() => {
		invokeElectronEvent(EventsMap.MEDIA_GET_SETTINGS, void 1).then(settings =>
			setSettings(settings)
		);
	}, []);

	const handleToggleBoard = (vendor: string, boardName: string) => {
		setSettings(settings => {
			const allowedBoards = settings.allowedBoards.map(allowedBoard => {
				const boards = allowedBoard.boards.map(board =>
					board.name === boardName && allowedBoard.vendor === vendor
						? { ...board, enabled: !board.enabled }
						: board
				);
				return { ...allowedBoard, boards };
			});

			return { ...settings, allowedBoards };
		});

		invokeElectronEvent(EventsMap.MEDIA_SET_SETTINGS, settings).then(void 0);
	};

	return (
		<div className="preferences">
			<div className="vendors">
				{settings.allowedBoards.map(({ vendor, boards }) => (
					<ul className="vendor">
						<li className="vendor__name">{VENDOR_NAMES?.[vendor]}</li>
						{boards.map((board, key) => (
							<li key={key}>
								<button
									onClick={() => handleToggleBoard(vendor, board.name)}
									className={`vendor__board ${board.enabled ? "" : "vendor__board--disabled"}`}>
									{board.name} - {board.description}
								</button>
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	);
}
