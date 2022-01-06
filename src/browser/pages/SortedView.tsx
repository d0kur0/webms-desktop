import { useStore } from "@nanostores/react";
import React from "react";
import { filesStore } from "stores/files";

export default function SortedView() {
	const files = useStore(filesStore);

	return <>{files.map(file => file.name)}</>;
}
