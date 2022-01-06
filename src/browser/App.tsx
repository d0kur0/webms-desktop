import "./App.css";
import MediaState from "components/MediaState";
import ToolBar from "components/ToolBar";
import Preferences from "pages/Preferences";
import RandomView from "pages/RandomView";
import SavedFiles from "pages/SavedFiles";
import SortedView from "pages/SortedView";
import * as React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";
import { setFiles } from "stores/files";
import { EventsMap } from "types/events";
import { handleBrowserEvent } from "utils/eventEmitter";

function App() {
	useEffect(() => {
		handleBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, (_, files) => {
			setFiles([...files]);
		});
	}, []);

	return (
		<BrowserRouter>
			<MediaState />
			<ToolBar />
			<Routes>
				<Route path="/" element={<RandomView />} />
				<Route path="/sortedView" element={<SortedView />} />
				<Route path="/savedFiles" element={<SavedFiles />} />
				<Route path="/preferences" element={<Preferences />} />
			</Routes>
		</BrowserRouter>
	);
}

ReactDOM.render(<App />, document.body);
