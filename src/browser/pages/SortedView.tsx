import { useStore } from "@nanostores/react";
import { useOnScreen } from "hooks/useOnScreen";
import { Files } from "webm-finder";

import "./SortedView.css";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { SortingRules, SortingRulesDefault } from "types/browser/sortings";

import { filesStore } from "stores/files";

import { sortingByRules } from "utils/file";

import FilePopup, { FileOverlay } from "components/FilePopup";
import SortingVariants from "components/SortingVariants";

const FILES_LIMIT = 70;

export default function SortedView() {
	const [sortingRules, setSortingRules] = useState<SortingRules>(SortingRulesDefault);

	const files = useStore(filesStore);
	const [sortedFiles, setSortedFiles] = useState<Files>([]);

	const loadingRef = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(loadingRef);

	const [offset, setOffset] = useState(0);
	const [partialFiles, setPartialFiles] = useState<Files>([]);

	const [openedFileIndex, setOpenedFileIndex] = useState<number | null>(null);

	useEffect(() => {
		setSortedFiles(sortingByRules(sortingRules, files));
	}, [files]);

	useEffect(() => {
		setPartialFiles(sortedFiles.slice(offset, FILES_LIMIT));
	}, [sortedFiles]);

	useEffect(() => {
		onScreen && partialFiles.length && setOffset(offset + FILES_LIMIT);
	}, [onScreen]);

	useEffect(() => {
		setPartialFiles([...partialFiles, ...sortedFiles.slice(offset, offset + FILES_LIMIT)]);
	}, [offset]);

	useEffect(() => {
		setSortedFiles([...sortingByRules(sortingRules, files)]);
	}, [sortingRules]);

	function onCloseOverlay() {
		setOpenedFileIndex(null);
	}

	function onOpenOverlay(key: number) {
		setOpenedFileIndex(key);
	}

	function onPreviousFile() {
		setOpenedFileIndex(openedFileIndex - 1);
	}

	function onNextFile() {
		const nextIndex = openedFileIndex + 1;
		partialFiles[nextIndex + 2] || setOffset(offset + FILES_LIMIT);
		setOpenedFileIndex(nextIndex);
	}

	function onChangeSortingRules(rules: SortingRules) {
		setSortingRules(rules);
	}

	return (
		<React.Fragment>
			<SortingVariants onChange={onChangeSortingRules} />

			<div className="sorted-view">
				{partialFiles[openedFileIndex] ? (
					<FileOverlay
						onPreviousFile={onPreviousFile}
						onNextFile={onNextFile}
						onClose={onCloseOverlay}
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
