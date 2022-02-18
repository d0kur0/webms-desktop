import "./MediaState.css";

import React, { useEffect, useState } from "react";

import { EventsMap } from "types/events";

import { handleBrowserEvent } from "utils/eventEmitter";

export default function MediaState(): JSX.Element {
	const [mediaState, setMediaState] = useState("");

	useEffect(() => {
		handleBrowserEvent(EventsMap.MEDIA_SEND_STATE, (_, state) => {
			setMediaState(state);
		});
	}, []);

	return (
		<React.Fragment>
			{mediaState && mediaState !== "endUpdate" && (
				<div className="media-state">Обновление файлов</div>
			)}
		</React.Fragment>
	);
}
