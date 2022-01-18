import { File } from "webm-finder";

import "./FileView.css";

import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { HiArrowNarrowLeft, HiArrowNarrowRight, HiOutlineSaveAs } from "react-icons/hi";
import { ImEyeBlocked } from "react-icons/im";

import { isImage } from "utils/file";
import { openSourceThread } from "utils/openSourceThread";

type FileViewProps = {
	file: File;
	onNextFile: () => void;
	onPreviousFile: () => void;
};

export default function FileView({ file, onNextFile, onPreviousFile }: FileViewProps) {
	const isFileImage = isImage(file.url);
	const videoRef = useRef<HTMLVideoElement>(null);

	const [paused, setPaused] = useState(false);
	const [volume, setVolume] = useState(+localStorage.volume || 0.1);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		if (!videoRef.current) return;
		videoRef.current.volume = volume;
		setDuration(videoRef.current.duration);
		setPaused(videoRef.current.paused);

		videoRef.current.addEventListener("timeupdate", () => {
			setCurrentTime(videoRef.current?.currentTime || 0);
		});

		videoRef.current.addEventListener("pause", () => setPaused(true));
		videoRef.current.addEventListener("play", () => setPaused(false));
		videoRef.current.addEventListener("ended", () => setPaused(false));
	}, [videoRef, file]);

	const onPlayPause: MouseEventHandler<HTMLButtonElement> = event => {
		setPaused(!paused);
		paused || videoRef.current.pause();
		paused && videoRef.current.play();
	};

	return (
		<div className="file-viewer">
			{isFileImage ? (
				<div
					className="file-viewer__container file-viewer__container--image"
					style={{ "--image": `url(${file.url})` } as React.CSSProperties}
				/>
			) : (
				<div className="file-viewer__container">
					<div className="file-view__video">
						<video autoPlay={true} ref={videoRef} src={file.url} />
					</div>
				</div>
			)}

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

						{isFileImage ? (
							<React.Fragment />
						) : (
							<button onClick={onPlayPause} className="controls__button controls__button--only-icon">
								{paused ? <BsPlayFill /> : <BsFillPauseFill />}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
