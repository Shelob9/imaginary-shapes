export interface Item {
	urgency: number;
	importance: number;
	title?: string;
	due?: Date;
	fun?: number;
}
export interface SavedItem extends Item {
	id: string;
}
export type itemCollection = Array<Item>;
export type savedItemsCollection = Array<SavedItem>;
