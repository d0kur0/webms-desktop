import { File } from "webm-finder";

import "./ImageView.css";

import React from "react";
import { HiArrowNarrowLeft, HiArrowNarrowRight, HiOutlineSaveAs } from "react-icons/hi";
import { ImEyeBlocked } from "react-icons/im";

type ImageViewProps = {
	file: File;
};

export default function ImageView({ file }: ImageViewProps) {
	return (
		<div className="image-viewer">
			<div className="image-viewer__container" style={{ "--image": `url(${file.url})` } as React.CSSProperties} />
			<div className="controls">
				<div className="controls__first-row">
					<div className="controls__name">{file.name || "Empty name"}</div>
					<div className="controls__buttons-group">
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
						<button className="controls__button">
							<HiArrowNarrowLeft /> Предыдущий
						</button>

						<button className="controls__button">
							<HiArrowNarrowRight /> Следующий
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
