import "./SortingVariants.css";

import React, { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import { SortingRules, SortingRulesDefault } from "types/browser/sortings";

type SortingVariantsProps = {
	onChange?: (rules: SortingRules) => void;
};

export default function SortingVariants({ onChange }: SortingVariantsProps) {
	const [sortingRules, setSortingRules] = useState<SortingRules>(SortingRulesDefault);

	useEffect(() => {
		onChange && onChange(sortingRules);
	}, [sortingRules]);

	function toggleDateSorting() {
		setSortingRules({ ...sortingRules, date: !sortingRules.date });
	}

	return (
		<ul className="sorting-variants">
			<li>
				<button onClick={toggleDateSorting} className="default-button ">
					{sortingRules.date ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
					По дате
				</button>
			</li>
		</ul>
	);
}
