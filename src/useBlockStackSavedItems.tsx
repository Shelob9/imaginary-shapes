import React from "react";
import useSavedItems from "./TodoItem/useSavedItems";
import { SavedItem, savedItemsCollection } from "./sorter/types";
import { useEffectOnce } from "react-use";
import UserSessionContext from "./UserSessionProvider";

export default function useBlockStackSavedItems(intitalActiveItemId?: string) {
	const { userSession, isLoggedIn } = React.useContext(UserSessionContext);

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
	const activeItem = activeItemId ? getItemById(activeItemId) : undefined;

	const firstItems = React.useRef<savedItemsCollection>();

	const fileName = `todoItems_v1.json`;

	const _doSave = (items: savedItemsCollection): Promise<void> => {
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
		return _doSave(update).then(() => updateItems(update));
	};

	const saveItem = (newItem: SavedItem) => {
		const update = items.map((item: SavedItem) => {
			return item.id === newItem.id ? newItem : item;
		});
		return _doSave(update).then(() => updateItems(update));
	};

	const getItems = () => {
		return new Promise((resolve) => {
			setIsLoading(true);
			const options = { decrypt: false };
			userSession
				.getFile(fileName, options)
				.then((file: string | undefined) => {
					const items = JSON.parse(file || "[]");
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

	//Load items on first load
	useEffectOnce(() => {
		if (isLoggedIn) {
			getItems();
		}
	});

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
		updateItems,
		items,
		saveNewItem,
		saveItem,
		firstItems,
		getItems,
	};
}
