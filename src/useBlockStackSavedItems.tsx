import { UserSession } from "blockstack";
import React from "react";
import useSavedItems from "./TodoItem/useSavedItems";
import { SavedItem, savedItemsCollection } from "./sorter/types";
export default function useBlockStackSavedItems(
	userSession: UserSession,
	intitalActiveItemId?: string
) {
	const [isSaving, setIsSaving] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [activeItemId, setActiveItemId] = React.useState<string>(
		intitalActiveItemId
	);
	const {
		getItemById,
		addItem,
		items,
		updateItems,
		updateItem,
	} = useSavedItems([]);
	const activeItem = React.useMemo<SavedItem | undefined>(() => {
		return activeItemId ? getItemById(activeItemId) : undefined;
	}, [activeItemId, items]);

	const fileName = `todoItems_v1.json`;

	const _doSave = (items: savedItemsCollection) => {
		return new Promise((resolve) => {
			const options = { encrypt: false };
			setIsSaving(true);
			userSession
				.putFile(fileName, JSON.stringify(items), options)
				.catch((e) => {
					console.log(e);
					resolve();
				})
				.finally(() => {
					setIsSaving(false);
					resolve();
				});
		});
	};
	const saveItems = () => {
		return _doSave(items);
	};

	const saveNewItem = (newItem: SavedItem) => {
		const update = [...items, newItem];
		return _doSave(update);
	};

	const saveItem = (newItem: SavedItem) => {
		const update = items.map((item: SavedItem) => {
			return item.id === newItem.id ? newItem : item;
		});
		return _doSave(update);
	};

	const getItems = () => {
		return new Promise((resolve) => {
			setIsLoading(true);
			const options = { decrypt: false };
			userSession
				.getFile(fileName, options)
				.then((file: string | undefined) => {
					const items = JSON.parse(file || "[]");
					console.log(items, file);
					updateItems(items);
				})
				.catch((e) => {
					console.log(e);
					resolve();
				})
				.finally(() => {
					setIsLoading(false);
					resolve();
				});
		});
	};
	//Call once to set items
	React.useEffect(() => {
		getItems();
	}, []);
	return {
		getItemById,
		addItem,
		activeItem,
		activeItemId,
		setActiveItemId,
		isSaving,
		isLoading,
		saveItems,
		updateItem,
		items,
		saveNewItem,
		saveItem,
	};
}
