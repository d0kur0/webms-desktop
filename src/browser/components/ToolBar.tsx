import * as React from "react";
import "./ToolBar.css";

export default function ToolBar() {
	return (
		<ul className="toolBar">
			<li>
				<a href="#">Рандомные вебмы</a>
			</li>
			<li>
				<a href="#">Сортированный список</a>
			</li>
			<li>
				<a href="#">Сохраненное</a>
			</li>
			<li>
				<a href="#">Настройки</a>
			</li>
		</ul>
	);
}
