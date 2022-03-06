import "./ToolBar.css";

import * as React from "react";
import { useEffect, useState } from "react";
import { FaSortNumericDown } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { HiOutlineSaveAs } from "react-icons/hi";
import {
	VscChromeClose,
	VscChromeMaximize,
	VscChromeMinimize,
	VscChromeRestore,
} from "react-icons/vsc";

import { EventsMap } from "types/events";

import { invokeElectronEvent } from "utils/eventEmitter";

import { ActiveLink } from "components/ActiveLink";

export default function ToolBar(): JSX.Element {
	const [isFullScreen, setFullScreen] = useState(false);

	useEffect(() => {
		invokeElectronEvent(EventsMap.WINDOW_GET_FULLSCREEN_STATE, void 1).then(isFullScreen =>
			setFullScreen(isFullScreen)
		);
	}, []);

	const onMinimize = () => {
		invokeElectronEvent(EventsMap.WINDOW_MINIMIZE, void 1).catch(console.error);
	};

	const onFullScreenToggle = () => {
		invokeElectronEvent(EventsMap.WINDOW_FULLSCREEN_TOGGLE, void 1).catch(console.error);
		setFullScreen(!isFullScreen);
	};

	const onClose = () => {
		invokeElectronEvent(EventsMap.WINDOW_CLOSE, void 1).catch(console.error);
	};

	return (
		<ul className="toolBar">
			<li>
				<ActiveLink to="/">
					<GiPerspectiveDiceSixFacesRandom />
					Рандомные вебмы
				</ActiveLink>
			</li>
			<li>
				<ActiveLink to="/sortedView">
					<FaSortNumericDown />
					Сортированный список
				</ActiveLink>
			</li>
			<li>
				<ActiveLink to="/threads">
					<HiOutlineSaveAs />
					Список тредов
				</ActiveLink>
			</li>
			<li>
				<ActiveLink to="/preferences">
					<FiSettings />
					Настройки
				</ActiveLink>
			</li>
			<li className="toolbar__free-space" />
			<li className="without-margin">
				<button className="toolbar__button" onClick={onMinimize}>
					<VscChromeMinimize />
				</button>
			</li>
			<li className="without-margin">
				<button onClick={onFullScreenToggle} className="toolbar__button">
					{isFullScreen ? <VscChromeRestore /> : <VscChromeMaximize />}
				</button>
			</li>
			<li className="without-margin">
				<button onClick={onClose} className="toolbar__button toolbar__button--close">
					<VscChromeClose />
				</button>
			</li>
		</ul>
	);
}
