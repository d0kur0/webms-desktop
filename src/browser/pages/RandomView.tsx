import { useStore } from "@nanostores/react";
import { shuffle } from "lodash";
import { Files } from "webm-finder";

import "./RandomView.css";

import React, { useEffect, useState } from "react";

import { filesStore } from "stores/files";

import FileView from "components/FileView";

export default function RandomView(): JSX.Element {
	const files = useStore(filesStore);
	const [randomFiles, setRandomFiles] = useState<Files>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		setRandomFiles(shuffle(files.filter(file => file?.url)));
	}, [files]);

	const onNextFile = () => {
		if (currentIndex + 1 > randomFiles.length) return;
		setCurrentIndex(currentIndex + 1);
	};

	const onPreviousFile = () => {
		if (currentIndex - 1 < 0) return;
		setCurrentIndex(currentIndex - 1);
	};

	const onError = () => {
		setRandomFiles(files => files.filter(file => file.url !== randomFiles[currentIndex].url));
		onNextFile();
	};

	return (
		<div className="random-view">
			{randomFiles[currentIndex] && (
				<FileView
					file={randomFiles[currentIndex]}
					onEnd={onNextFile}
					onError={onError}
					onNextFile={onNextFile}
					imageAsVideo={true}
					onPreviousFile={onPreviousFile}
				/>
			)}
		</div>
	);
}
