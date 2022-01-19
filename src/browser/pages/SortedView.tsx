import { useStore } from "@nanostores/react";
import { useOnScreen } from "hooks/useOnScreen";
import { File, Files } from "webm-finder";

import "./SortedView.css";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { filesStore } from "stores/files";

import { sortFilesByDate } from "utils/file";

import FilePopup, { FileOverlay } from "components/FilePopup";

const FILES_LIMIT = 40;

export default function SortedView() {
	const files = useStore(filesStore);
	const sortedFiles = useMemo(() => sortFilesByDate(files), [files]);

	const [offset, setOffset] = useState(0);
	const [partialFiles, setPartialFiles] = useState<Files>(sortedFiles.slice(0, FILES_LIMIT));

	useEffect(() => {
		setPartialFiles(sortedFiles.slice(offset, FILES_LIMIT));
	}, [sortedFiles]);

	const [openedFileIndex, setOpenedFileIndex] = useState<number | null>(null);

	const onClose = () => setOpenedFileIndex(null);
	const onOpenOverlay = (key: number) => setOpenedFileIndex(key);
	const onPreviousFile = () => setOpenedFileIndex(openedFileIndex - 1);
	const onNextFile = () => {
		const nextIndex = openedFileIndex + 1;
		partialFiles[nextIndex] || setOffset(offset + FILES_LIMIT);
		setOpenedFileIndex(nextIndex);
	};

	const loadingRef = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(loadingRef);

	useEffect(() => {
		onScreen && partialFiles.length && setOffset(offset + FILES_LIMIT);
	}, [onScreen]);

	useEffect(() => {
		setPartialFiles([...partialFiles, ...sortedFiles.slice(offset, offset + FILES_LIMIT)]);
	}, [offset]);

	return (
		<React.Fragment>
			<div className="sorted-view">
				{partialFiles[openedFileIndex] ? (
					<FileOverlay
						onPreviousFile={onPreviousFile}
						onNextFile={onNextFile}
						onClose={onClose}
						file={partialFiles[openedFileIndex]}
					/>
				) : (
					<React.Fragment />
				)}

				{partialFiles.map((file, key) => (
					<FilePopup onOpen={() => onOpenOverlay(key)} key={key} file={file} />
				))}

				<div ref={loadingRef} className="sorted-view__loading">
					Loading ...
				</div>
			</div>
		</React.Fragment>
	);
}
