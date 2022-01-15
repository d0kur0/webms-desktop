import { File } from "webm-finder";

import "./ImageView.css";

import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { HiArrowNarrowLeft, HiArrowNarrowRight, HiOutlineSaveAs } from "react-icons/hi";
import { ImEyeBlocked } from "react-icons/im";

import { EventsMap } from "types/events";

import { invokeElectronEvent } from "utils/eventEmitter";

type ImageViewProps = {
	file: File;
	onNextFile: () => void;
	onPreviousFile: () => void;
};

const openSourceThread = async (url: string) => {
	await invokeElectronEvent(EventsMap.OPEN_SOURCE_THREAD, url);
};

export default function ImageView({ file, onNextFile, onPreviousFile }: ImageViewProps) {
	return (
		<div className="image-viewer">
			<div className="image-viewer__container" style={{ "--image": `url(${file.url})` } as React.CSSProperties} />
			<div className="controls">
				<div className="controls__first-row">
					<div className="controls__name">{file.name || "Empty name"}</div>
					<div className="controls__buttons-group">
						<button onClick={() => openSourceThread(file.rootThread.url)} className="controls__button">
							<FiExternalLink /> {file.rootThread.subject}
						</button>

						<button className="controls__button">
							<ImEyeBlocked /> В фильтр
						</button>

						<button className="controls__button">
							<HiOutlineSaveAs /> Сохранить
						</button>
					</div>
				</div>

				<div className="controls__second-row">
					<div className="controls__buttons-group">
						<button onClick={onPreviousFile} className="controls__button controls__button--only-icon">
							<HiArrowNarrowLeft />
						</button>

						<button onClick={onNextFile} className="controls__button controls__button--only-icon">
							<HiArrowNarrowRight />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
