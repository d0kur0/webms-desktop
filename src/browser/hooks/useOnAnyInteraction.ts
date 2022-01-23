import { MutableRefObject, useEffect, useState } from "react";

export function useOnAnyInteraction(): boolean {
	const [isInteraction, setIsInteraction] = useState(false);

	const onInteraction = () => setIsInteraction(true);

	useEffect(() => {
		document.body.addEventListener("mousemove", onInteraction);
		document.body.addEventListener("scroll", onInteraction);
		document.body.addEventListener("keydown", onInteraction);
		document.body.addEventListener("click", onInteraction);
		document.body.addEventListener("touchstart", onInteraction);

		return () => {
			document.body.removeEventListener("mousemove", onInteraction);
			document.body.removeEventListener("scroll", onInteraction);
			document.body.removeEventListener("keydown", onInteraction);
			document.body.removeEventListener("click", onInteraction);
			document.body.removeEventListener("touchstart", onInteraction);
		};
	}, []);

	return isInteraction;
}
