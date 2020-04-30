import { savedItemsCollection } from "./types";

import { urgentOnly, importantanceSort, urgencySort } from "./sorters";

export default function urgency(
	items: savedItemsCollection
): savedItemsCollection {
	let results = urgentOnly(items);
	if (null !== results) {
		urgencySort(results);
		importantanceSort(results);
	}
	return results;
}
