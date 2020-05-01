import { savedItemsCollection } from "./types";
import { importantOnly, urgentOnly, notDoneOnly } from "./sorters";
import { itersection, difference } from "./find";
export type quadrant = savedItemsCollection | null;
export type quadrantsType = {
	topLeft: quadrant;
	topRight: quadrant;
	bottomLeft: quadrant;
	bottomRight: quadrant;
};
export default function quadrants(items: savedItemsCollection): quadrantsType {
	const urgent = urgentOnly(items);
	const important = importantOnly(items);
	const topLeft = notDoneOnly(itersection(urgent, important));
	const topRight = notDoneOnly(difference(important, urgent));
	const bottomLeft = notDoneOnly(difference(urgent, important));
	const bottomRight = notDoneOnly(
		itersection(difference(items, urgent), difference(items, important))
	);
	return {
		topLeft, //Urgent and important
		topRight, //Important not urgent
		bottomLeft, //Urgent, not important
		bottomRight, //Not urgent or important
	};
}
