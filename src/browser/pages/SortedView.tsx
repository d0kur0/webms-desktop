import { useStore } from "@nanostores/react";
import { Files } from "webm-finder";

import "./SortedView.css";

import React, { useEffect, useMemo, useState } from "react";

import { filesStore } from "stores/files";

import { sortByBoardAndName } from "utils/file";

import FilePopup from "components/FilePopup";

const FILES_LIMIT = 40;

export default function SortedView() {
	const files = useStore(filesStore);
	const sortedFile = useMemo(() => {
		return sortByBoardAndName(files);
	}, [files]);

	const [offset, setOffset] = useState(0);
	const [partialFiles, setPartialFiles] = useState<Files>(sortedFile.slice(0, FILES_LIMIT));

	useEffect(() => {
		setPartialFiles(sortedFile.slice(0, FILES_LIMIT));
	}, [sortedFile]);

	return (
		<div className="sorted-view">
			{partialFiles.map((file, key) => (
				<FilePopup key={key} file={file} />
			))}
		</div>
	);
}
