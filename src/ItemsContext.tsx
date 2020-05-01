import React from "react";
import useBlockStackSavedItems from "./useBlockStackSavedItems";
import { SavedItem, savedItemsCollection } from "./sorter/types";
import { Spinner } from "theme-ui";
type ItemsContextValue = {
	getItemById: (itemId: string) => SavedItem | undefined;
	addItem: (item: SavedItem) => void;
	activeItem: SavedItem | undefined;
	activeItemId: string;
	setActiveItemId: (activeItemId: string) => void;
	isSaving: boolean;
	isLoading: boolean;
	saveItems: () => Promise<void>;
	updateItem: (item: SavedItem) => void;
	updateItems: (items: savedItemsCollection) => void;
	items: savedItemsCollection;
	saveNewItem: (newItem: SavedItem) => Promise<void>;
	saveItem: (newItem: SavedItem) => Promise<void>;
	hasChanged: boolean;
	LoadingIndicator: () => JSX.Element;
	SavingIndicator: () => JSX.Element;
};
export const ItemsContext = React.createContext<ItemsContextValue>(
	//@ts-ignore
	null
);

export const ItemsProvider = (props: {
	intitalActiveItemId?: string;
	children: any;
}) => {
	const {
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
		updateItems,
	} = useBlockStackSavedItems(props.intitalActiveItemId);

	const hasChanged = false;

	const LoadingIndicator = () => (isLoading ? <Spinner /> : null);
	const SavingIndicator = () => (isSaving ? <Spinner /> : null);

	return (
		<ItemsContext.Provider
			value={{
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
				hasChanged,
				LoadingIndicator,
				SavingIndicator,
				updateItems,
			}}
		>
			{props.children}
		</ItemsContext.Provider>
	);
};
