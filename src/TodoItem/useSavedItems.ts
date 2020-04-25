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

	const updateItem = (item: SavedItem) => {
		updateItems(
			items.map((i: SavedItem) => {
				return i.id === item.id ? item : i;
			})
		);
	};
	return {
		items,
		updateItems,
		getItemById,
		addItem,
		updateItem,
	};
}
