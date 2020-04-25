import { Item } from "../sorter/types";
import React from "react";
export default function useItem(initialItem?: Item) {
	const [item, updateItem] = React.useState<Item>(initialItem);
	return {
		item,
		updateItem,
	};
}
