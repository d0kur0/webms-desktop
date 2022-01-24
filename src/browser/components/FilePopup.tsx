import { File } from "webm-finder";

import "./FilePopup.css";

import React, { useEffect, useState } from "react";
import { MdCloseFullscreen } from "react-icons/md";

import { getFileType, isImage } from "utils/file";

import FileView from "components/FileView";
import Loader from "components/Loader";

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
		return () => document.body.classList.remove("lock-body-scroll");
	}, []);

	function handleClose() {
		document.body.classList.remove("lock-body-scroll");
		onClose();
	}

	return (
		<div className="file-popup__overlay">
			<div className="file-popup__body">
				<FileView
					buttonsRender={
						<button onClick={handleClose} className="controls__button">
							<MdCloseFullscreen /> Закрыть
						</button>
					}
					onNextFile={onNextFile}
					onPreviousFile={onPreviousFile}
					file={file}
				/>
			</div>
		</div>
	);
}

export default function FilePopup({ file, onOpen }: FilePopupProps) {
	const isFileImage = isImage(file.url);
	const fileType = getFileType(file.url);
	const [isLoaded, setIsLoaded] = useState(false);

	const onImageLoaded = () => setIsLoaded(true);

	useEffect(() => {
		setIsLoaded(false);
	}, [file.url]);

	return (
		<div onClick={onOpen} className="file-popup" title={file.name}>
			<img
				onLoad={onImageLoaded}
				alt={file.name}
				className="file-popup__image"
				src={file.previewUrl}
			/>
			{isLoaded ? "" : <Loader />}
			<span className="file-popup__board">{file.rootThread.board}</span>
			<span className={`file-popup__type file-popup__type--${isFileImage ? "image" : "video"}`}>
				{fileType}
			</span>
		</div>
	);
}
