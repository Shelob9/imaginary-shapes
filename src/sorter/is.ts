import { Item } from "./types";

function isBeacuseFun(item: Item): boolean {
	return undefined !== item.fun ? 5 >= item.fun : false;
}

function isUrgent(item: Item): boolean {
	return item.hasOwnProperty("urgency") && item.urgency >= 5;
}

function isFun(item: Item): boolean {
	return item.hasOwnProperty("fun") && item.fun >= 5;
}

function isImportant(item: Item): boolean {
	return item.hasOwnProperty("importance") && item.importance >= 5;
}

export { isBeacuseFun, isImportant, isFun, isUrgent };
