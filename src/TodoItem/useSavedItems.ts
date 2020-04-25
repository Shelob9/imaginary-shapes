import { savedItemsCollection, SavedItem } from "../sorter/types";
import React from "react";
export default function useSavedItems(initialItems?: savedItemsCollection) {
	const [items, updateItems] = React.useState<savedItemsCollection>(
		initialItems ? initialItems : []
	);

	const getItemById = (id: string) =>
		items.find((item: SavedItem) => id === item.id);

	const addItem = (item: SavedItem) => {
		updateItems([...items, item]);
	};
	return {
		items,
		updateItems,
		getItemById,
		addItem,
	};
}
