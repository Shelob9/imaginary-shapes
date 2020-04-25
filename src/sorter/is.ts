import { Item } from "./types";

function isBeacuseFun(item: Item): boolean {
	return undefined !== item.fun ? 5 >= item.fun : false;
}

export { isBeacuseFun };
