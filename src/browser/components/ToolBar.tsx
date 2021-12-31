import "./ToolBar.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { FaSortNumericDown } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { HiOutlineSaveAs } from "react-icons/hi";
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { EventsMap } from "types/events";
import { invokeEvent } from "utils/eventEmitter";

export default function ToolBar() {
	const [isFullScreen, setFullScreen] = useState(false);

	useEffect(() => {
		invokeEvent(EventsMap.WINDOW_GET_FULLSCREEN_STATE, void 1).then(isFullScreen => setFullScreen(isFullScreen));
	}, []);

	const onMinimize = () => {
		invokeEvent(EventsMap.WINDOW_MINIMIZE, void 1).catch(console.error);
	};

	const onFullScreenToggle = () => {
		invokeEvent(EventsMap.WINDOW_FULLSCREEN_TOGGLE, void 1).catch(console.error);
		setFullScreen(!isFullScreen);
	};

	const onClose = () => {
		invokeEvent(EventsMap.WINDOW_CLOSE, void 1).catch(console.error);
	};

	return (
		<ul className="toolBar">
			<li>
				<Link to="/">
					<GiPerspectiveDiceSixFacesRandom />
					Рандомные вебмы
				</Link>
			</li>
			<li>
				<Link to="/sortedView">
					<FaSortNumericDown />
					Сортированный список
				</Link>
			</li>
			<li>
				<Link to="/savedFiles">
					<HiOutlineSaveAs />
					Сохраненное
				</Link>
			</li>
			<li>
				<Link to="/preferences">
					<FiSettings />
					Настройки
				</Link>
			</li>
			<li className="toolbar-free-space" />
			<li className="without-margin">
				<button className="toolbar-button" onClick={onMinimize}>
					<VscChromeMinimize />
				</button>
			</li>
			<li className="without-margin">
				<button onClick={onFullScreenToggle} className="toolbar-button">
					{isFullScreen ? <VscChromeRestore /> : <VscChromeMaximize />}
				</button>
			</li>
			<li className="without-margin">
				<button onClick={onClose} className="toolbar-button toolbar-button-close">
					<VscChromeClose />
				</button>
			</li>
		</ul>
	);
}
