import quadrants from "./quadrants";
import { findByTitle } from "./find";

describe("Quadrants", () => {
	test("Important, not urgent is in right, not left", () => {
		const items = [
			{ urgency: 3, importance: 7, title: "U:3:I7", id: "1" },
			{ urgency: 10, importance: 7, title: "U:10:I7", id: "2" },
		];

		const r = quadrants(items);
		expect(r).not.toBe(null);
		expect(r.topLeft).not.toBe(null);
		expect(r.topRight).not.toBe(null);
		if (r.topLeft !== null && r.topRight !== null) {
			expect(r.topLeft.length).toBe(1);
			expect(r.topRight.length).toBe(1);
			const rT = findByTitle("U:3:I7", r.topRight);
			expect(rT).not.toBe(null);
			if (rT) {
				expect(rT.urgency).toEqual(3);
			}
			const lT = findByTitle("U:10:I7", r.topLeft);
			expect(lT).not.toBe(null);
			if (lT) {
				expect(lT.urgency).toEqual(10);
			}
		}
	});

	test("Top Left Can Be Empty", () => {
		const r = quadrants([
			{ urgency: 3, importance: 7, title: "ImportantNotUrgent", id: "1" },
			{ urgency: 2, importance: 2, title: "NotUrgentAndNotImportant", id: "1" },
			{ urgency: 10, importance: 3, title: "UrgentNotImportant", id: "1" },
		]);
		expect(r.topLeft).toEqual([]);
	});
	test("Top Right Can Be Empty", () => {
		const r = quadrants([
			{ urgency: 10, importance: 7, title: "UrgentAndImportant", id: "1" },
			{ urgency: 2, importance: 2, title: "NotUrgentAndNotImportant", id: "1" },
			{ urgency: 10, importance: 3, title: "UrgentNotImportant", id: "1" },
		]);
		expect(r.topRight).toEqual([]);
	});
	test("Bottom Left Can Be Empty", () => {
		const r = quadrants([
			{ urgency: 10, importance: 7, title: "UrgentAndImportant", id: "1" },
			{ urgency: 2, importance: 2, title: "NotUrgentAndNotImportant", id: "1" },
		]);
		expect(r.bottomLeft).toEqual([]);
	});
	test("Bottom Right Can Be Empty", () => {
		const r = quadrants([
			{ urgency: 10, importance: 7, title: "UrgentAndImportant", id: "1" },
		]);
		expect(r.bottomRight).toEqual([]);
	});

	const fourItems = [
		{ urgency: 3, importance: 7, title: "ImportantNotUrgent", id: "1" },
		{ urgency: 10, importance: 7, title: "UrgentAndImportant", id: "1" },
		{ urgency: 2, importance: 2, title: "NotUrgentAndNotImportant", id: "1" },
		{ urgency: 10, importance: 3, title: "UrgentNotImportant", id: "1" },
	];

	test("Bottom left has urgent not important", () => {
		const r = quadrants(fourItems);
		expect(r).not.toBe(null);
		expect(r.bottomLeft).not.toBe(null);
		if (r.bottomLeft !== null) {
			expect(r.bottomLeft.length).toBe(1);
			const rT = findByTitle("UrgentNotImportant", r.bottomLeft);
			expect(rT).not.toBe(null);
			if (rT) {
				expect(rT.title).toEqual("UrgentNotImportant");
			}
		}
	});
	test("Bottom right  has not urgent and not important", () => {
		const r = quadrants(fourItems);
		expect(r).not.toBe(null);
		expect(r.bottomRight).not.toBe(null);
		if (r.bottomRight !== null) {
			expect(r.bottomRight.length).toBe(1);
			const rT = findByTitle("NotUrgentAndNotImportant", r.bottomRight);
			expect(rT).not.toBe(null);
			if (rT) {
				expect(rT.title).toEqual("NotUrgentAndNotImportant");
			}
		}
	});
});
