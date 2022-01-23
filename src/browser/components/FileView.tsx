import { useStore } from "@nanostores/react";
import { File } from "webm-finder";

import "./FileView.css";

import React, { MouseEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import { BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { HiArrowNarrowLeft, HiArrowNarrowRight, HiOutlineSaveAs } from "react-icons/hi";
import { ImEyeBlocked } from "react-icons/im";
import { IoMdVolumeOff } from "react-icons/io";
import { IoVolumeMedium } from "react-icons/io5";

import { userStore } from "stores/user";

import { isImage } from "utils/file";
import { openSourceThread } from "utils/openSourceThread";

import CustomRange from "components/CustomRange";

type FileViewProps = {
	file: File;
	onNextFile: () => void;
	onPreviousFile: () => void;
	onEnd?: () => void;
	imageAsVideo?: boolean;
	buttonsRender?: JSX.Element;
};

const IMAGE_DURATION_THEN_EMULATE_VIDEO = 8;

export default function FileView({
	file,
	onNextFile,
	onPreviousFile,
	buttonsRender,
	imageAsVideo,
	onEnd,
}: FileViewProps) {
	const user = useStore(userStore);

	const isFileImage = isImage(file.url);
	const videoRef = useRef<HTMLVideoElement>(null);

	const [paused, setPaused] = useState(user.isInteracted);
	const [volume, setVolume] = useState(
		localStorage.volumeDisabled ? 0 : +localStorage.volume || 0.1
	);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		if (!videoRef.current) return;
		videoRef.current.volume = volume;
		setPaused(videoRef.current.paused);
	}, [videoRef, file]);

	useEffect(() => {
		if (!(isFileImage && imageAsVideo)) return;

		let timeout: NodeJS.Timeout;
		let iteration = 0;

		const timeoutCallback = () => {
			iteration++;
			setCurrentTime(iteration);

			const nextIteration = () => {
				timeout = setTimeout(timeoutCallback, 1000);
			};

			const stopIteration = () => {
				setCurrentTime(0);
				onEnd && onEnd();
			};

			iteration < IMAGE_DURATION_THEN_EMULATE_VIDEO ? nextIteration() : stopIteration();
		};

		timeoutCallback();
		return () => clearInterval(timeout);
	}, [file]);

	const onPlayPause: MouseEventHandler<HTMLButtonElement> = event => {
		setPaused(!paused);
		paused || videoRef.current.pause();
		paused && videoRef.current.play();
	};

	const onPause = () => setPaused(true);
	const onPlay = () => setPaused(false);
	const onEnded = () => {
		onEnd && onEnd();
		setPaused(true);
	};

	const onLoadedMetaData = ({ currentTarget }: SyntheticEvent<HTMLVideoElement>) =>
		setDuration(currentTarget.duration);
	const onTimeUpdate = ({ currentTarget }: SyntheticEvent<HTMLVideoElement>) =>
		setCurrentTime(currentTarget.currentTime);

	const onChangeCurrentTime = ([value]: number[]) => {
		setCurrentTime(value);
		videoRef.current.currentTime = value;
	};

	const onChangeVolume = ([value]: number[]) => {
		setVolume(value);
		videoRef.current.volume = value;
		localStorage.volume = value;
	};

	const onDisableVolume = () => {
		if (localStorage.volumeDisabled) {
			const restoredValue = +localStorage.volume || 0.5;
			setVolume(restoredValue);
			videoRef.current.volume = restoredValue;
			localStorage.removeItem("volumeDisabled");
		} else {
			setVolume(0);
			videoRef.current.volume = 0;
			localStorage.setItem("volumeDisabled", "1");
		}
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
						<video
							onPlay={onPlay}
							onPause={onPause}
							onEnded={onEnded}
							onTimeUpdate={onTimeUpdate}
							onLoadedMetadata={onLoadedMetaData}
							autoPlay={user.isInteracted}
							ref={videoRef}
							src={file.url}
						/>
					</div>
				</div>
			)}

			<div className="file-viewer__info">
				<div className="file-viewer__name">{file.name || "Empty name"}</div>
				<div className="controls__buttons-group">
					<button
						onClick={() => openSourceThread(file.rootThread.url)}
						className="controls__button">
						<FiExternalLink /> {file.rootThread.subject || "Empty thread name"}
					</button>

					<button className="controls__button">
						<ImEyeBlocked /> В фильтр
					</button>

					<button className="controls__button">
						<HiOutlineSaveAs /> Сохранить
					</button>

					{buttonsRender}
				</div>
			</div>

			<div className="controls">
				<div className="controls__body">
					<div className="controls__buttons-group">
						<button
							onClick={onPreviousFile}
							className="controls__button controls__button--only-icon">
							<HiArrowNarrowLeft />
						</button>

						<button onClick={onNextFile} className="controls__button controls__button--only-icon">
							<HiArrowNarrowRight />
						</button>

						{isFileImage ? (
							<React.Fragment />
						) : (
							<button
								onClick={onPlayPause}
								className="controls__button controls__button--only-icon">
								{paused ? <BsPlayFill /> : <BsFillPauseFill />}
							</button>
						)}
					</div>

					{isFileImage && imageAsVideo ? (
						<div className="controls__progress">
							<CustomRange
								min={0}
								disabled={true}
								max={IMAGE_DURATION_THEN_EMULATE_VIDEO}
								step={0.1}
								values={[currentTime]}
								onChange={() => {}}
							/>
						</div>
					) : (
						<React.Fragment />
					)}

					{isFileImage ? (
						<React.Fragment />
					) : (
						<React.Fragment>
							<div className="controls__timeline">
								<span className="controls__timeline-value">00:00</span>
								<CustomRange
									min={0}
									max={duration || 1}
									step={0.1}
									values={[currentTime]}
									onChange={onChangeCurrentTime}
								/>
								<span className="controls__timeline-value">00:00</span>
							</div>
							<div className="controls__volume">
								<button onClick={onDisableVolume} className="controls__volume-icon">
									{volume ? <IoVolumeMedium /> : <IoMdVolumeOff />}
								</button>
								<CustomRange
									min={0}
									max={1}
									step={0.1}
									values={[volume]}
									onChange={onChangeVolume}
								/>
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
		</div>
	);
}
