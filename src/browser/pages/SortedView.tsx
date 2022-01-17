import { useStore } from "@nanostores/react";
import { File, Files } from "webm-finder";

import "./SortedView.css";

import React, { useEffect, useMemo, useState } from "react";

import { filesStore } from "stores/files";

import { sortFilesByDate } from "utils/file";

import FilePopup, { FileOverlay } from "components/FilePopup";

const FILES_LIMIT = 40;

export default function SortedView() {
	const files = useStore(filesStore);
	const sortedFile = useMemo(() => sortFilesByDate(files), [files]);

	const [offset, setOffset] = useState(0);
	const [partialFiles, setPartialFiles] = useState<Files>(sortedFile.slice(0, FILES_LIMIT));

	useEffect(() => {
		setPartialFiles(sortedFile.slice(offset, FILES_LIMIT));
	}, [sortedFile, offset]);

	const [openedFileIndex, setOpenedFileIndex] = useState<number | null>(null);

	const onOpenOverlay = (key: number) => {
		partialFiles[key] || setOffset(offset + FILES_LIMIT);
		setOpenedFileIndex(key);
	};

	const Overlay = () => {
		const onClose = () => setOpenedFileIndex(null);
		const onNextFile = () => setOpenedFileIndex(openedFileIndex + 1);
		const onPreviousFile = () => setOpenedFileIndex(openedFileIndex - 1);

		return (
			<React.Fragment>
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
			</React.Fragment>
		);
	};

	return (
		<div className="sorted-view">
			<Overlay />

			{partialFiles.map((file, key) => (
				<FilePopup onOpen={() => onOpenOverlay(key)} key={key} file={file} />
			))}
		</div>
	);
}
