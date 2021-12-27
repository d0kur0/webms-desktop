import "./ToolBar.css";
import * as React from "react";
import { FaSortNumericDown } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { HiOutlineSaveAs } from "react-icons/hi";

export default function ToolBar() {
	return (
		<ul className="toolBar">
			<li>
				<a href="#">
					<GiPerspectiveDiceSixFacesRandom />
					Рандомные вебмы
				</a>
			</li>
			<li>
				<a href="#">
					<FaSortNumericDown />
					Сортированный список
				</a>
			</li>
			<li>
				<a href="#">
					<HiOutlineSaveAs />
					Сохраненное
				</a>
			</li>
			<li>
				<a href="#">
					<FiSettings />
					Настройки
				</a>
			</li>
		</ul>
	);
}
