import { savedItemsCollection } from "./types";
import { importantOnly, urgentOnly } from "./sorters";
import { itersection, difference } from "./find";
type quadrant = savedItemsCollection | null;
type quadrantsType = {
	topLeft: quadrant;
	topRight: quadrant;
	bottomLeft: quadrant;
	bottomRight: quadrant;
};
export default function quadrants(items: savedItemsCollection): quadrantsType {
	const urgent = urgentOnly(items);
	const important = importantOnly(items);
	const topLeft = itersection(urgent, important);
	const topRight = difference(important, urgent);
	const bottomLeft = difference(urgent, important);
	const bottomRight = itersection(
		difference(items, urgent),
		difference(items, important)
	);
	return {
		topLeft, //Urgent and important
		topRight, //Important not urgent
		bottomLeft, //Urgent, not important
		bottomRight, //Not urgent or important
	};
}
