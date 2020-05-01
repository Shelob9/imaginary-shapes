import { savedItemsCollection, SavedItem } from "./types";
import { isDone } from "./is";

function onlyGreater(
	items: savedItemsCollection,
	key: "urgency" | "importance",
	than: number
) {
	return items.filter((item: SavedItem) => item[key] >= than);
}

function sortBy(items: savedItemsCollection, key: "urgency" | "importance") {
	return items.sort((a: SavedItem, b: SavedItem) => (a[key] < b[key] ? 1 : -1));
}

function funSort(items: savedItemsCollection) {
	return items.sort((a: SavedItem, b: SavedItem) => {
		if (!a.fun && !b.fun) {
			return 0;
		}
		if (!a.fun || !b.fun) {
			if (!a.fun) {
				a.fun = 0;
			}
			if (!b.fun) {
				b.fun = 0;
			}
		}
		return a.fun < b.fun ? 1 : -1;
	});
}

function urgentOnly(items: savedItemsCollection): savedItemsCollection {
	return onlyGreater(items, "urgency", 5);
}

function importantOnly(items: savedItemsCollection): savedItemsCollection {
	return onlyGreater(items, "importance", 5);
}
function importantanceSort(items: savedItemsCollection): savedItemsCollection {
	return sortBy(funSort(items), "importance");
}

function urgencySort(items: savedItemsCollection): savedItemsCollection {
	return sortBy(funSort(items), "urgency");
}

function notDoneOnly(items: savedItemsCollection): savedItemsCollection {
	if (!items || !items.length) {
		return [];
	}
	return items.filter((item: SavedItem) => !isDone(item));
}

export {
	onlyGreater,
	sortBy,
	urgentOnly,
	importantanceSort,
	urgencySort,
	importantOnly,
	notDoneOnly,
};
