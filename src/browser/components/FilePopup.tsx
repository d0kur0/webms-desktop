import { File } from "webm-finder";

import "./FilePopup.css";

import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

import { isImage } from "utils/file";

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
		<div className="video-popup-overlay">
			<div className="video-popup-header">
				<div className="video-popup-header__name">{file.name || "name is empty"}</div>
				<button onClick={handleClose} className="video-popup-header__close">
					<GrClose />
				</button>
			</div>
		</div>
	);
}

export default function FilePopup({ file }: FilePopupProps) {
	const isFileImage = isImage(file.url);
	const [isOpen, setIsOpen] = useState(false);

	const handleOverlayOpen = () => {
		setIsOpen(true);
	};

	return (
		<>
			{isOpen ? <Overlay file={file} onClose={() => setIsOpen(false)} /> : ""}

			<div
				onClick={handleOverlayOpen}
				className="video-popup"
				style={{ "--preview-image": `url(${isFileImage ? file.url : file.previewUrl})` } as React.CSSProperties}>
				<span className="video-popup-title">
					{file.name} ({file.rootThread.board})
				</span>
			</div>
		</>
	);
}
