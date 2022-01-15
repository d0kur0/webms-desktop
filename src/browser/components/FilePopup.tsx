import { File } from "webm-finder";

import "./FilePopup.css";

import React, { useEffect, useState } from "react";

import { getFileType, isImage } from "utils/file";

import ImageView from "components/ImageView";

type FilePopupProps = {
	file: File;
	onOpen: () => void;
};

type FileOverlayProps = {
	onClose: () => void;
	onNextFile: () => void;
	onPreviousFile: () => void;
	file: File;
};

export function FileOverlay({ onClose, onNextFile, onPreviousFile, file }: FileOverlayProps) {
	useEffect(() => {
		document.body.classList.add("lock-body-scroll");
	}, []);

	const handleClose = () => {
		document.body.classList.remove("lock-body-scroll");
		onClose();
	};

	return (
		<div className="file-popup__overlay">
			<div className="file-popup__header">
				<button onClick={handleClose} className="file-popup__header-close">
					Закрыть
				</button>
			</div>

			<div className="file-popup__body">
				{isImage(file.url) ? <ImageView onNextFile={onNextFile} onPreviousFile={onPreviousFile} file={file} /> : ""}
			</div>
		</div>
	);
}

export default function FilePopup({ file, onOpen }: FilePopupProps) {
	const isFileImage = isImage(file.url);
	const fileType = getFileType(file.url);

	return (
		<div
			onClick={onOpen}
			className="file-popup"
			style={{ "--preview-image": `url(${isFileImage ? file.url : file.previewUrl})` } as React.CSSProperties}>
			<span className="file-popup__title">
				{file.name} ({file.rootThread.board})
			</span>
			<span className={`file-popup__type file-popup__type--${isFileImage ? "image" : "video"}`}>{fileType}</span>
		</div>
	);
}
