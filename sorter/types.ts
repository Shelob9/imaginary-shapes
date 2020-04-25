export interface Item {
  urgency: number;
  importance: number;
  title?: string;
  due?: Date;
  fun?: number;
}

export type itemCollection = Array<Item>;
