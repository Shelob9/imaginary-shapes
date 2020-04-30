export type dragAndDropItem = {
	id: string;
	content: string;
};
export type dragAndDropItems = { [key: string]: dragAndDropItem };

export type dragAndDropColumm = {
	id: string;
	title: string;
	itemIds: Array<string>;
};
export type dragAndDropState = {
	items: dragAndDropItems;
	columns: { [key: string]: dragAndDropColumm };
	columnOrder: Array<string>;
};

export type columnId = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
export type location = { droppableId: columnId; index: number };
export type locationChange = {
	previousQuadrant: location;
	newQuadrant: location;
	itemId: string;
};
