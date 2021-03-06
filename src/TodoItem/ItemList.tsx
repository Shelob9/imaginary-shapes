import React from "react";
import { Item, savedItemsCollection, SavedItem } from "../sorter/types";
import Title from "./Title";

type onOpenType = (itemId: string) => void;
export function ItemShort(props: {
	item: SavedItem;
	onOpen: onOpenType;
	onChangeTitle: (newValue: string) => void;
	editMode: boolean;
}) {
	const { title, id } = props.item;
	const { onOpen, onChangeTitle } = props;
	return (
		<div>
			{props.editMode ? (
				<React.Fragment>
					<Title
						title={title}
						setTitle={(newValue: string) => onChangeTitle(newValue)}
					/>
					<button onClick={() => onOpen(id)}>Edit</button>
				</React.Fragment>
			) : (
				<p>{title}</p>
			)}
		</div>
	);
}
export default function ItemList(props: {
	items: savedItemsCollection;
	notFoundText: string;
	onOpenItem: onOpenType;
	updateItem: (update: Item) => void;
	activeItemId?: string;
}) {
	const { items, notFoundText, onOpenItem: onOpenIitem } = props;
	if (!items.length) {
		return <p>{notFoundText}</p>;
	}
	const onChangeTitle = (title: string, item: Item) =>
		props.updateItem({ ...item, title });

	const onOpen = (itemId: string, item: Item) => {
		onChangeTitle(item.title, item);
		onOpenIitem(itemId);
	};

	return (
		<ul>
			{items.map((item: SavedItem) => (
				<li key={item.id}>
					<ItemShort
						editMode={
							props.activeItemId && item.id === props.activeItemId
								? true
								: false
						}
						item={item}
						onOpen={(itemId) => onOpen(itemId, item)}
						onChangeTitle={(newValue: string) => onChangeTitle(newValue, item)}
					/>
				</li>
			))}
		</ul>
	);
}
