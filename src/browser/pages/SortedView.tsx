import { useStore } from "@nanostores/react";
import { useOnScreen } from "hooks/useOnScreen";

import "./SortedView.css";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { SortingRules, SortingRulesDefault } from "types/browser/sortings";

import { filesStore } from "stores/files";

import { sortingByRules } from "utils/file";

import FilePopup, { FileOverlay } from "components/FilePopup";
import SortingVariants from "components/SortingVariants";

const FILES_LIMIT = 70;

export default function SortedView(): JSX.Element {
	const allFiles = useStore(filesStore);
	const { threadId } = useParams<{ threadId?: string }>();

	const loadingRef = useRef<HTMLDivElement>(null);
	const loadingVisible = useOnScreen(loadingRef);

	const [offset, setOffset] = useState(0);
	const [openedFileIndex, setOpenedFileIndex] = useState<number | null>(null);
	const [sortingRules, setSortingRules] = useState<SortingRules>({
		...SortingRulesDefault,
		threadId: +threadId || null,
	});

	const filesForRender = useMemo(() => {
		const files = sortingByRules(sortingRules, allFiles);
		return files.slice(0, offset + FILES_LIMIT);
	}, [allFiles, sortingRules, offset]);

	useEffect(() => {
		setSortingRules(rules => ({ ...rules, threadId: +threadId }));
		setOpenedFileIndex(null);
	}, [threadId]);

	useEffect(() => {
		loadingVisible && filesForRender.length && setOffset(offset + FILES_LIMIT);
	}, [loadingVisible]);

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
		filesForRender[nextIndex + 2] || setOffset(offset + FILES_LIMIT);
		setOpenedFileIndex(nextIndex);
	}

	function onChangeSortingRules(rules: SortingRules) {
		setSortingRules(rules);
	}

	return (
		<React.Fragment>
			{threadId ? (
				<div className="sorted-view__thread-info">
					Открыт тред: {filesForRender?.[0]?.rootThread.subject}
				</div>
			) : (
				<React.Fragment />
			)}

			<SortingVariants rules={sortingRules} onChange={onChangeSortingRules} />

			<div className="sorted-view">
				{filesForRender[openedFileIndex] ? (
					<FileOverlay
						onPreviousFile={onPreviousFile}
						onNextFile={onNextFile}
						onClose={onCloseOverlay}
						file={filesForRender[openedFileIndex]}
					/>
				) : (
					<React.Fragment />
				)}

				{filesForRender.map((file, key) => (
					<FilePopup onOpen={() => onOpenOverlay(key)} key={key} file={file} />
				))}

				<div ref={loadingRef} className="sorted-view__loading" />
			</div>
		</React.Fragment>
	);
}
