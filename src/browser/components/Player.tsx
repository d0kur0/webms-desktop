import "./Player.css";
import React from "react";
import { EventsMap } from "types/events";
import { handleBrowserEvent, invokeElectronEvent } from "utils/eventEmitter";

export default function Player() {
	invokeElectronEvent(EventsMap.MEDIA_GET_CACHE, void 1).then(media => {
		console.log(media);
	});

	handleBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, (_, files) => {
		console.log("MEDIA_SEND_UPDATED_FILES", files);
	});

	return (
		<div className="player">
			<video src="https://2ch.hk/a/src/7402417/16379721779380.webm" />
		</div>
	);
}
