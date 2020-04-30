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
