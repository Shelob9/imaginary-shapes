import { itemCollection } from "./types";
import { importantOnly, importantanceSort } from "./sorters";

export default function importance(items: itemCollection): itemCollection {
	let results = importantOnly(items);
	if (null !== results) {
		importantanceSort(results);
	}
	return results;
}
