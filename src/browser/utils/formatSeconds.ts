export const formatSeconds = (time: number): string => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time - minutes * 60);

	return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
