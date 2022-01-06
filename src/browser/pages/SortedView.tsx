import { useStore } from "@nanostores/react";
import { Files } from "webm-finder";

import "./SortedView.css";

import React, { useEffect, useState } from "react";

import { filesStore } from "stores/files";

import VideoPopup from "components/VideoPopup";

const FILES_LIMIT = 30;

export default function SortedView() {
	const files = useStore(filesStore);
	const [offset, setOffset] = useState(0);
	const [partialFiles, setPartialFiles] = useState<Files>(files.slice(0, FILES_LIMIT));

	useEffect(() => {
		setPartialFiles(files.slice(0, FILES_LIMIT));
	}, [files]);

	return (
		<div className="sorted-view">
			{partialFiles.map(file => (
				<VideoPopup file={file} />
			))}
		</div>
	);
}
