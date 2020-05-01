import { Item, SavedItem } from "./types";

function isBeacuseFun(item: Item | SavedItem): boolean {
	return undefined !== item.fun ? 5 >= item.fun : false;
}

function isUrgent(item: Item | SavedItem): boolean {
	return item.hasOwnProperty("urgency") && item.urgency >= 5;
}

function isDone(item: Item | SavedItem): boolean {
	return !item.hasOwnProperty("done") || false === item.done ? false : true;
}

function isFun(item: Item | SavedItem): boolean {
	return item.hasOwnProperty("fun") && item.fun >= 5;
}

function isImportant(item: Item | SavedItem): boolean {
	return item.hasOwnProperty("importance") && item.importance >= 5;
}

export { isBeacuseFun, isImportant, isFun, isUrgent, isDone };
