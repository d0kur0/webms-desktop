import { useStore } from "@nanostores/react";
import { shuffle } from "lodash";

import "./RandomView.css";

import React, { useMemo, useState } from "react";

import { filesStore } from "stores/files";

import FileView from "components/FileView";

export default function RandomView() {
	const files = useStore(filesStore);
	const randomFiles = useMemo(() => shuffle(files.filter(file => file?.url)), [files]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const onNextFile = () => {
		if (currentIndex + 1 > randomFiles.length) return;
		setCurrentIndex(currentIndex + 1);
	};

	const onPreviousFile = () => {
		if (currentIndex - 1 < 0) return;
		setCurrentIndex(currentIndex - 1);
	};

	return (
		<div className="random-view">
			{randomFiles[currentIndex] && (
				<FileView
					file={randomFiles[currentIndex]}
					onEnd={onNextFile}
					onNextFile={onNextFile}
					imageAsVideo={true}
					onPreviousFile={onPreviousFile}
				/>
			)}
		</div>
	);
}
