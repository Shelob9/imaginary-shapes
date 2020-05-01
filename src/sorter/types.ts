export interface Item {
	urgency: number;
	importance: number;
	title?: string;
	due?: Date; //please remove this please Josh
	fun?: number;
	done?: boolean;
}
export interface SavedItem extends Item {
	id: string;
}
export type itemCollection = Array<Item>;
export type savedItemsCollection = Array<SavedItem>;
