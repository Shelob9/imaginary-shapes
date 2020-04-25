import React from "react";
import { UserSession } from "blockstack";
import useBlockStackSavedItems from "./useBlockStackSavedItems";
import { SavedItem, savedItemsCollection } from "./sorter/types";

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
	items: savedItemsCollection;
	saveNewItem: (newItem: SavedItem) => Promise<void>;
	saveItem: (newItem: SavedItem) => Promise<void>;
};
export const ItemsContext = React.createContext<ItemsContextValue>(
	//@ts-ignore
	null
);

export const ItemsProvider = (props: {
	userSession: UserSession;
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
	} = useBlockStackSavedItems(props.userSession, props.intitalActiveItemId);

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
			}}
		>
			{props.children}
		</ItemsContext.Provider>
	);
};
