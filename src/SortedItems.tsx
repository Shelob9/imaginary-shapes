import React from "react";
import { ItemsContext } from "./ItemsContext";
import quadrants, { quadrantsType } from "./sorter/quadrants";
import { savedItemsCollection, SavedItem } from "./sorter/types";
import {
	dragAndDropState,
	locationChange,
	columnId,
} from "./DragAndDrop/types";
import DragAndDrop from "./DragAndDrop/DragAndDrop";
import urgency from "./sorter/urgency";
import { isImportant, isUrgent } from "./sorter/is";

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
	getItemById: (id: string) => SavedItem | undefined
): savedItemsCollection => {
	let update: savedItemsCollection = [];
	let item = getItemById(locationChange.itemId);
	if (!item) {
		return items;
	}
	if (isQuadrantChange(locationChange)) {
		item = changeTo(item, locationChange.newQuadrant.droppableId);
		update = items.map((i: SavedItem) => {
			if (i.id === item.id) {
				return item;
			}
			return i;
		});
	} else {
		const q = quadrants(items);
		const qI = quadrants[locationChange.newQuadrant.droppableId];
		if (isHigher(locationChange)) {
		} else {
		}
	}
	return update;
};

export default function (props: { lock: boolean }) {
	const {
		asDndState,
		topLeft,
		topRight,
		bottomLeft,
		bottomRight,
	} = useQuadrants();

	const {
		isLoading,
		LoadingIndicator,
		SavingIndicator,
		getItemById,
	} = React.useContext(ItemsContext);

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
