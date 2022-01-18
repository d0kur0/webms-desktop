import { useStore } from "@nanostores/react";

import "./RandomView.css";

import React, { useEffect, useMemo } from "react";

import { filesStore } from "stores/files";

import { isImage } from "utils/file";

import FileView from "components/FileView";

export default function RandomView() {
	const files = useStore(filesStore);
	const file = useMemo(() => files.find(f => !isImage(f.url)), [files]);

	return (
		<div className="random-view">
			{file && <FileView file={file} onPreviousFile={console.log} onNextFile={console.log} />}
		</div>
	);
}
