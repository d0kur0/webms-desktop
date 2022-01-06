import { File } from "webm-finder";

import "./VideoPopup.css";

import React from "react";

type VideoPopupProps = { file: File };

export default function VideoPopup({ file }: VideoPopupProps) {
	return (
		<div className="video-popup" style={{ "--preview-image": `url(${file.previewUrl})` } as React.CSSProperties}>
			<span className="video-popup-title">
				{file.name} ({file.rootThread.board})
			</span>
		</div>
	);
}
