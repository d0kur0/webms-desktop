import "./Preferences.css";

import React from "react";

export default function Preferences() {
	return (
		<div className="preferences">
			<div className="preferences__title">Настройка борд</div>

			<div className="vendors">
				<ul className="vendor">
					<li className="vendor__name">2ch.hk</li>
					<li>
						<button className="vendor__board">
							<span className="vendor__status" /> media
						</button>
					</li>
					<li className="vendor__board">
						<span className="vendor__status" /> 123
					</li>
					<li className="vendor__board">
						<span className="vendor__status" /> 123
					</li>
					<li className="vendor__board">
						<span className="vendor__status" /> 123
					</li>
				</ul>
				<div className="vendor">2</div>
			</div>
		</div>
	);
}
