import React, { useRef } from "react";
import { ItemsContext } from "./ItemsContext";
import quadrants, { quadrantsType } from "./sorter/quadrants";
import { savedItemsCollection, SavedItem } from "./sorter/types";
import {
	dragAndDropState,
	//@typescript-eslint-ignore
	locationChange,
	columnId,
} from "./DragAndDrop/types";
import DragAndDrop from "./DragAndDrop/DragAndDrop";
import { isImportant, isUrgent } from "./sorter/is";
import { urgencySort, importantanceSort } from "./sorter/sorters";

const sortedItemIds = (
	quadrants: quadrantsType,
	columnId: columnId,
	by: "urgency" | "importance"
) => {
	let items = quadrants[columnId];
	switch (by) {
		case "urgency":
			items = urgencySort(items);
			break;

		case "importance":
		default:
			items = importantanceSort(items);
			break;
	}
	return items.map((item: SavedItem) => item.id);
};
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
						: sortedItemIds(
								{
									topLeft,
									topRight,
									bottomLeft,
									bottomRight,
								},
								"topLeft",
								"urgency"
						  ),
			},
			topRight: {
				id: "topRight",
				title: "Top Right",
				itemIds:
					!topRight || !topRight.length
						? []
						: sortedItemIds(
								{
									topLeft,
									topRight,
									bottomLeft,
									bottomRight,
								},
								"topRight",
								"importance"
						  ),
			},
			bottomLeft: {
				id: "bottomLeft",
				title: "Bottom Left",
				itemIds:
					!bottomLeft || !bottomLeft.length
						? []
						: sortedItemIds(
								{
									topLeft,
									topRight,
									bottomLeft,
									bottomRight,
								},
								"bottomLeft",
								"urgency"
						  ),
			},
			bottomRight: {
				id: "bottomRight",
				title: "Bottom Right",
				itemIds:
					!bottomRight || !bottomRight.length
						? []
						: sortedItemIds(
								{
									topLeft,
									topRight,
									bottomLeft,
									bottomRight,
								},
								"bottomRight",
								"importance"
						  ),
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

export const isQuadrantChange = (locationChange: locationChange) => {
	return (
		locationChange.previousQuadrant.droppableId !==
		locationChange.newQuadrant.droppableId
	);
};

export const isHigher = (locationChange: locationChange) => {
	return (
		locationChange.previousQuadrant.index <= locationChange.newQuadrant.index
	);
};

export const changeTo = (item: SavedItem, what: columnId): SavedItem => {
	switch (what) {
		case "topLeft": {
			return {
				...item,
				importance: isImportant(item) ? item.importance : 10,
				urgency: isUrgent(item) ? item.urgency : 10,
			};
		}
		case "topRight": {
			return {
				...item,
				importance: isImportant(item) ? item.importance : 10,
				urgency: !isUrgent(item) ? item.urgency : 4,
			};
		}
		case "bottomLeft": {
			return {
				...item,
				importance: !isImportant(item) ? item.importance : 0,
				urgency: isUrgent(item) ? item.urgency : 7,
			};
		}
		case "bottomRight": {
			return {
				...item,
				importance: !isImportant(item) ? item.importance : 0,
				urgency: !isUrgent(item) ? item.urgency : 0,
			};
		}
		default:
			return item;
	}
};
export const reorderOnLocationChange = (
	locationChange: locationChange,
	items: savedItemsCollection,
	getItemById: (id: string) => SavedItem | undefined,
	newQuadrantOrder: Array<string>
): savedItemsCollection => {
	let newQuadrantId = locationChange.newQuadrant.droppableId;
	let update: savedItemsCollection = [];
	let item = getItemById(locationChange.itemId);
	if (!item) {
		return items;
	}
	if (isQuadrantChange(locationChange)) {
		item = changeTo(item, newQuadrantId);
		update = items.map((i: SavedItem) => {
			if (i.id === item.id) {
				return item;
			}
			return i;
		});
	} else {
		let quadrant = quadrants(items)[newQuadrantId];
		let _quadrant: savedItemsCollection = [];
		newQuadrantOrder.forEach((itemId: string, index) => {
			let item = getItemById(itemId);
			if (item) {
				if ("topLeft" || "bottomLeft" === newQuadrantId) {
					_quadrant.push({
						...item,
						urgency: quadrant[index].urgency,
					});
				} else {
					_quadrant.push({
						...item,
						importance: quadrant[index].importance,
					});
				}
			}
		});
		update = items.map((item: SavedItem) => {
			let updateItem = _quadrant.find((i: SavedItem) => i.id === item.id);
			return updateItem ? updateItem : item;
		});
	}
	return update;
};

export default function (props: { lock: boolean }) {
	const { asDndState } = useQuadrants();
	const gridRef = useRef();
	const {
		isLoading,
		LoadingIndicator,
		SavingIndicator,
		getItemById,
		items,
		updateItems,
	} = React.useContext(ItemsContext);

	const middleware = (
		update: dragAndDropState,
		locationChange: locationChange
	): dragAndDropState => {
		const quadrantId = locationChange.newQuadrant.droppableId;
		let newQuadrantOrder = update.columns[quadrantId].itemIds;

		let updated = reorderOnLocationChange(
			locationChange,
			items,
			getItemById,
			newQuadrantOrder
		);

		updateItems(updated);
		return update;
	};

	//When items change re-sort
	//This allows for thumb toggling to update state
	React.useEffect(() => {
		if (items && gridRef.current) {
			//@ts-ignore
			gridRef.current.resetState(asDndState());
		}
	}, [items, asDndState]);

	return (
		<React.Fragment>
			<LoadingIndicator />
			<SavingIndicator />
			{!isLoading && (
				<DragAndDrop
					gridRef={gridRef}
					initialData={asDndState()}
					stateMiddleWare={middleware}
				/>
			)}
		</React.Fragment>
	);
}
