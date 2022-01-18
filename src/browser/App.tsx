import "./App.css";

import * as React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";

import { EventsMap } from "types/events";

import { setFiles } from "stores/files";

import { handleBrowserEvent, invokeElectronEvent } from "utils/eventEmitter";

import Preferences from "pages/Preferences";
import RandomView from "pages/RandomView";
import SavedFiles from "pages/SavedFiles";
import SortedView from "pages/SortedView";

import ToolBar from "components/ToolBar";

function App() {
	useEffect(() => {
		invokeElectronEvent(EventsMap.APP_READY, void 1).then();

		handleBrowserEvent(EventsMap.MEDIA_SEND_UPDATED_FILES, (_, files) => {
			setFiles([...files]);
			console.log("Хуетьа");
		});
	}, []);

	return (
		<BrowserRouter>
			<ToolBar />
			<div className="app-root">
				<div className="app-body">
					<Routes>
						<Route path="/" element={<RandomView />} />
						<Route path="/sortedView" element={<SortedView />} />
						<Route path="/savedFiles" element={<SavedFiles />} />
						<Route path="/preferences" element={<Preferences />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

ReactDOM.render(<App />, document.body);
