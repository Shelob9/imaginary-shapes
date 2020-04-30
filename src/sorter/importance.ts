import { savedItemsCollection } from "./types";
import { importantOnly, importantanceSort } from "./sorters";

export default function importance(
	items: savedItemsCollection
): savedItemsCollection {
	let results = importantOnly(items);
	if (null !== results) {
		importantanceSort(results);
	}
	return results;
}
