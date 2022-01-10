import { File } from "webm-finder";

import "./ImageView.css";

import React from "react";

type ImageViewProps = {
	file: File;
};

export default function ImageView({ file }: ImageViewProps) {
	return (
		<div className="image-viewer">
			<div className="image-viewer__container" style={{ "--image": `url(${file.url})` } as React.CSSProperties}>
				1
			</div>
		</div>
	);
}
