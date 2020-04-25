import importance from "./importance";
import { itemCollection } from "./types";

describe("Importance", () => {
	it("sorts by importance", () => {
		const items = [
			{ urgency: 1, importance: 7 },
			{ urgency: 2, importance: 9 },
		];
		const r = importance(items);
		expect(r).not.toEqual(null);
		if (r !== null) {
			expect(r.length).toBe(2);
			expect(r[0].urgency).toEqual(2);
			expect(r[1].urgency).toEqual(1);
		}
	});

	it("Removes unimportant", () => {
		const items = [
			{ urgency: 8, importance: 3 },
			{ urgency: 1, importance: 7 },
			{ urgency: 2, importance: 9 },
		];
		const r = importance(items);
		expect(r).not.toEqual(null);
		if (r !== null) {
			expect(r.length).toBe(2);
		}
	});

	it("Gives prefrence to fun", () => {
		const items: itemCollection = [
			// { urgency: 7, importance: 2, title: 'undefiend fun' },
			{ urgency: 7, importance: 9, title: "NOT", fun: 5 },
			{ urgency: 7, importance: 9, title: "FUN", fun: 10 },
			{ urgency: 7, importance: 8, title: "NOT8" },
			{ urgency: 7, importance: 8, title: "FUN8", fun: 1 },
		];

		const urgentItems = importance(items);
		expect(urgentItems[0].title).toEqual("FUN");
		expect(urgentItems[1].title).toEqual("NOT");
		expect(urgentItems[2].title).toEqual("FUN8");
		expect(urgentItems[3].title).toEqual("NOT8");
	});
});
