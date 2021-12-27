import "./App.css";
import { useStore } from "@nanostores/react";
import ToolBar from "components/ToolBar";
import * as React from "react";
import ReactDOM from "react-dom";
import { addFile, files } from "stores/files";

function App() {
	const list = useStore(files);

	return (
		<>
			<ToolBar />

			{list.map(file => file.name)}
		</>
	);
}

ReactDOM.render(<App />, document.body);
