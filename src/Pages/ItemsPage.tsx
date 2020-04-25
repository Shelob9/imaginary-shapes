import React from "react";
import { UserSession } from "blockstack";
import useBlockStackSavedItems from "../useBlockStackSavedItems";
import { useHistory } from "react-router-dom";
import { SavedItem } from "../sorter/types";
import ItemList from "../TodoItem/ItemList";
import { New } from "../TodoItem/New";
const LoadingIndicator = (props: { isLoading: boolean }) =>
	props.isLoading ? <div>Loading Spinner</div> : null;
const SavingIndicator = (props: { isSaving: boolean }) =>
	props.isSaving ? <div>Saving Spinner</div> : null;

export default function ItemsPage(props: { userSession: UserSession }) {
	const {
		addItem,
		activeItem,
		saveNewItem,
		updateItem,
		items,
		setActiveItemId,
	} = useBlockStackSavedItems(props.userSession);
	const history = useHistory();

	const onSave = (item: SavedItem) => {
		saveNewItem(item).then(() => {
			addItem(item);
			history.push(`/items/${item.id}`);
		});
	};

	if (activeItem) {
		return <div>{activeItem.id}</div>;
	}
	return (
		<div>
			<div>Items List</div>
			<ItemList
				items={items}
				notFoundText={"No Items"}
				updateItem={updateItem}
				onOpenItem={setActiveItemId}
			/>
			<New onSave={onSave} />
		</div>
	);
}
