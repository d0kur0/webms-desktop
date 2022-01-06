import "./RandomView.css";

import React from "react";

import Player from "components/Player";

export default function RandomView(): JSX.Element {
	return (
		<div className="random-view">
			<Player />
		</div>
	);
}
