import "./App.css";
import ToolBar from "components/ToolBar";
import Preferences from "pages/Preferences";
import RandomView from "pages/RandomView";
import SavedFiles from "pages/SavedFiles";
import SortedView from "pages/SortedView";
import * as React from "react";
import ReactDOM from "react-dom";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
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
