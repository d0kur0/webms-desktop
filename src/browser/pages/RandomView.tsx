import { useStore } from "@nanostores/react";

import "./RandomView.css";

import React, { useMemo } from "react";

import { filesStore } from "stores/files";

import FileView from "components/FileView";

export default function RandomView() {
	const files = useStore(filesStore);
	const file = useMemo(() => files.find(f => f.name === "15951215554660.webm"), [files]);

	return (
		<div className="random-view">
			{file && <FileView file={file} onPreviousFile={console.log} onNextFile={console.log} />}
		</div>
	);
}
