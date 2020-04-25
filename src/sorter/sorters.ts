import { itemCollection, Item } from "./types";

function onlyGreater(
	items: itemCollection,
	key: "urgency" | "importance",
	than: number
) {
	return items.filter((item: Item) => item[key] >= than);
}

function sortBy(items: itemCollection, key: "urgency" | "importance") {
	return items.sort((a: Item, b: Item) => (a[key] < b[key] ? 1 : -1));
}

function funSort(items: itemCollection) {
	return items.sort((a: Item, b: Item) => {
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
function urgentOnly(items: itemCollection): itemCollection {
	return onlyGreater(items, "urgency", 5);
}

function importantOnly(items: itemCollection): itemCollection {
	return onlyGreater(items, "importance", 5);
}
function importantanceSort(items: itemCollection): itemCollection {
	return sortBy(funSort(items), "importance");
}

function urgencySort(items: itemCollection): itemCollection {
	return sortBy(funSort(items), "urgency");
}

export {
	onlyGreater,
	sortBy,
	urgentOnly,
	importantanceSort,
	urgencySort,
	importantOnly,
};
