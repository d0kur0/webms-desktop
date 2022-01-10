import { File } from "webm-finder";

import "./FilePopup.css";

import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

import { getFileType, isImage } from "utils/file";

import ImageView from "components/ImageView";

type FilePopupProps = { file: File };
type OverlayProps = { onClose: () => void; file: File };

function Overlay({ onClose, file }: OverlayProps) {
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
				<div className="file-popup__header-name">{file.name || "name is empty"}</div>
				<button onClick={handleClose} className="file-popup__header-close">
					<GrClose />
				</button>
			</div>

			<div className="file-popup__body">{isImage(file.url) ? <ImageView file={file} /> : ""}</div>
		</div>
	);
}

export default function FilePopup({ file }: FilePopupProps) {
	const isFileImage = isImage(file.url);
	const [isOpen, setIsOpen] = useState(false);
	const fileType = getFileType(file.url);

	const handleOverlayOpen = () => {
		setIsOpen(true);
	};

	return (
		<>
			{isOpen ? <Overlay file={file} onClose={() => setIsOpen(false)} /> : ""}

			<div
				onClick={handleOverlayOpen}
				className="file-popup"
				style={{ "--preview-image": `url(${isFileImage ? file.url : file.previewUrl})` } as React.CSSProperties}>
				<span className="file-popup__title">
					{file.name} ({file.rootThread.board})
				</span>
				<span className={`file-popup__type file-popup__type--${isFileImage ? "image" : "video"}`}>{fileType}</span>
			</div>
		</>
	);
}
