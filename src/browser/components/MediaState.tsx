import "./MediaState.css";

import React from "react";
import { useEffect, useState } from "react";

import { EventsMap } from "types/events";

import { handleBrowserEvent } from "utils/eventEmitter";

export default function MediaState() {
	const [mediaState, setMediaState] = useState("");

	useEffect(() => {
		handleBrowserEvent(EventsMap.MEDIA_SEND_STATE, (_, state) => {
			setMediaState(state);
		});
	}, []);

	return <div className="media-state">{mediaState}</div>;
}
