import React from "react";
import { ItemsContext } from "./ItemsContext";
import quadrants from "./sorter/quadrants";
import { savedItemsCollection, SavedItem } from "./sorter/types";
import { dragAndDropState } from "./DragAndDrop/types";
import DragAndDrop, { locationChange } from "./DragAndDrop/DragAndDrop";

export function useQuadrants() {
	const { items } = React.useContext(ItemsContext);

	const {
		topLeft, //Urgent and important
		topRight, //Important not urgent
		bottomLeft, //Urgent, not important
		bottomRight, //Not urgent or important
	} = quadrants(items);

	const asDndState = (): dragAndDropState => {
		let _items = {};
		items.forEach((item: SavedItem) => {
			_items[item.id] = {
				id: item.id,
				content: item.title,
			};
		});

		const columns = {
			topLeft: {
				id: "topLeft",
				title: "Top Left",
				itemIds:
					!topLeft || !topLeft.length
						? []
						: topLeft.map((item: SavedItem) => item.id),
			},
			topRight: {
				id: "topRight",
				title: "Top Right",
				itemIds:
					!topRight || !topRight.length
						? []
						: topRight.map((item: SavedItem) => item.id),
			},
			bottomLeft: {
				id: "bottomLeft",
				title: "Bottom Left",
				itemIds:
					!bottomLeft || !bottomLeft.length
						? []
						: bottomLeft.map((item: SavedItem) => item.id),
			},
			bottomRight: {
				id: "bottomRight",
				title: "Bottom Right",
				itemIds:
					!bottomRight || !bottomRight.length
						? []
						: bottomRight.map((item: SavedItem) => item.id),
			},
		};

		return {
			items: _items,
			columns,
			columnOrder: ["topLeft", "topRight", "bottomLeft", "bottomRight"],
		};
	};
	return {
		topLeft: topLeft as savedItemsCollection,
		topRight: topRight as savedItemsCollection,
		bottomLeft: bottomLeft as savedItemsCollection,
		bottomRight: bottomRight as savedItemsCollection,
		asDndState,
	};
}
export default function (props: { lock: boolean }) {
	const { asDndState } = useQuadrants();

	const { isLoading, LoadingIndicator, SavingIndicator } = React.useContext(
		ItemsContext
	);

	const currentState = asDndState();

	const middleware = (
		update: dragAndDropState,
		locationChange: locationChange
	) => {
		console.log(update, locationChange);
		return update;
	};
	return (
		<React.Fragment>
			<LoadingIndicator />
			<SavingIndicator />
			{!isLoading && (
				<DragAndDrop initialData={currentState} stateMiddleWare={middleware} />
			)}
		</React.Fragment>
	);
}
