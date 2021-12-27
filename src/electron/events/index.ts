import { handleEvent } from "utils/eventEmitter";
import { EventsMap } from "types/events";

handleEvent(EventsMap.OPEN_APP, (event, args) => {});

handleEvent(EventsMap.TEST, (event, args) => {
	return [];
});
