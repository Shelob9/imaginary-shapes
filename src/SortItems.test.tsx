//import React from "react";
//import { render, fireEvent } from "@testing-library/react";
import {
	isQuadrantChange,
	isHigher,
	reorderOnLocationChange,
	changeTo,
} from "./SortedItems";
import quadrants, { quadrantsType } from "./sorter/quadrants";
import { SavedItem } from "./sorter/types";

describe("changeTo", () => {
	it("makes topLeft", () => {
		expect(
			changeTo(
				{
					urgency: 2,
					importance: 2,
					title: "Time",
					id: "times",
				},
				"topLeft"
			)
		).toEqual({
			urgency: 10,
			importance: 10,
			title: "Time",
			id: "times",
		});

		expect(
			changeTo(
				{
					urgency: 1,
					importance: 9,
					title: "Time",
					id: "times",
				},
				"topLeft"
			)
		).toEqual({
			urgency: 10,
			importance: 9,
			title: "Time",
			id: "times",
		});

		expect(
			changeTo(
				{
					urgency: 8,
					importance: 8,
					title: "Time",
					id: "times",
				},
				"topLeft"
			)
		).toEqual({
			urgency: 8,
			importance: 8,
			title: "Time",
			id: "times",
		});
	});
	it("makes topRight", () => {
		expect(
			changeTo(
				{
					urgency: 2,
					importance: 2,
					title: "Time",
					id: "times",
				},
				"topRight"
			)
		).toEqual({
			urgency: 2,
			importance: 10,
			title: "Time",
			id: "times",
		});

		expect(
			changeTo(
				{
					urgency: 3,
					importance: 2,
					title: "Time",
					id: "times",
				},
				"topRight"
			)
		).toEqual({
			urgency: 3,
			importance: 10,
			title: "Time",
			id: "times",
		});

		expect(
			changeTo(
				{
					urgency: 0,
					importance: 2,
					title: "Time",
					id: "times",
				},
				"topRight"
			)
		).toEqual({
			urgency: 0,
			importance: 10,
			title: "Time",
			id: "times",
		});

		expect(
			changeTo(
				{
					urgency: 7,
					importance: 2,
					title: "Time",
					id: "times",
				},
				"topRight"
			)
		).toEqual({
			urgency: 4,
			importance: 10,
			title: "Time",
			id: "times",
		});

		expect(
			changeTo(
				{
					urgency: 7,
					importance: 6,
					title: "Time",
					id: "times",
				},
				"topRight"
			)
		).toEqual({
			urgency: 4,
			importance: 6,
			title: "Time",
			id: "times",
		});
	});
	it("makes bottomRight", () => {
		expect(
			changeTo(
				{
					urgency: 7,
					importance: 7,
					title: "Time",
					id: "times",
				},
				"bottomRight"
			)
		).toEqual({
			urgency: 0,
			importance: 0,
			title: "Time",
			id: "times",
		});

		expect(
			changeTo(
				{
					urgency: 7,
					importance: 3,
					title: "Time",
					id: "times",
				},
				"bottomRight"
			)
		).toEqual({
			urgency: 0,
			importance: 3,
			title: "Time",
			id: "times",
		});
	});
	it("makes bottomLeft", () => {
		expect(
			changeTo(
				{
					urgency: 7,
					importance: 7,
					title: "Time",
					id: "times",
				},
				"bottomLeft"
			)
		).toEqual({
			urgency: 7,
			importance: 0,
			title: "Time",
			id: "times",
		});

		expect(
			changeTo(
				{
					urgency: 3,
					importance: 3,
					title: "Time",
					id: "times",
				},
				"bottomLeft"
			)
		).toEqual({
			urgency: 7,
			importance: 3,
			title: "Time",
			id: "times",
		});
	});
});
describe("reorderOnLocationChange", () => {
	const getItemById = jest.fn((id: string) => {
		return {
			urgency: 7,
			importance: 3,
			title: "Time",
			id,
		};
	});
	const items = [
		{ urgency: 2, importance: 2, title: "NotUrgentAndNotImportant", id: "BR" },
		{ urgency: 4, importance: 9, title: "UrgentNotImportant", id: "TR" },
	];
	test("moved to topLeft", () => {
		const getItemById = jest.fn((id: string) => {
			return { urgency: 10, importance: 3, title: "UrgentNotImportant", id };
		});
		const reordered = reorderOnLocationChange(
			{
				previousQuadrant: {
					index: 0,
					droppableId: "topRight",
				},
				newQuadrant: {
					index: 0,
					droppableId: "topLeft",
				},
				itemId: "TR",
			},
			items,
			getItemById,
			[]
		);
		const newItems: quadrantsType = quadrants(reordered);

		expect(newItems.topLeft.length).toBe(1);
		expect(newItems.topLeft[0]).toEqual({
			urgency: 10,
			importance: 10,
			title: "UrgentNotImportant",
			id: "TR",
		});

		expect(newItems.topRight.length).toBe(0);
	});
	test("moved to topRight", () => {
		expect(quadrants(items).topRight.length).toBe(1);
		const reordered = reorderOnLocationChange(
			{
				previousQuadrant: {
					index: 0,
					droppableId: "bottomRight",
				},
				newQuadrant: {
					index: 0,
					droppableId: "topRight",
				},
				itemId: "BR",
			},
			items,
			getItemById,
			[]
		);
		const newItems: quadrantsType = quadrants(reordered);
		expect(newItems.topRight.length).toBe(2);
		expect(
			newItems.topRight.find((item: SavedItem) => "BR" === item.id)
		).toEqual({
			urgency: 4,
			importance: 10,
			title: "Time",
			id: "BR",
		});
		expect(newItems.bottomRight.length).toBe(0);
	});

	test("moved to bottomRight", () => {
		const reordered = reorderOnLocationChange(
			{
				previousQuadrant: {
					index: 0,
					droppableId: "topRight",
				},
				newQuadrant: {
					index: 0,
					droppableId: "bottomRight",
				},
				itemId: "TR",
			},
			items,
			getItemById,
			[]
		);
		const newItems: quadrantsType = quadrants(reordered);
		expect(newItems.bottomRight.length).toBe(2);
		expect(
			newItems.bottomRight.find((item: SavedItem) => "TR" === item.id)
		).toEqual({
			urgency: 0,
			importance: 3,
			title: "Time",
			id: "TR",
		});
		expect(newItems.topRight.length).toBe(0);
	});

	test("moved to bottomLeft", () => {
		const reordered = reorderOnLocationChange(
			{
				previousQuadrant: {
					index: 0,
					droppableId: "topRight",
				},
				newQuadrant: {
					index: 0,
					droppableId: "bottomLeft",
				},
				itemId: "TR",
			},
			items,
			getItemById,
			[]
		);
		const newItems: quadrantsType = quadrants(reordered);
		expect(newItems.bottomLeft.length).toBe(1);
		expect(newItems.bottomLeft[0]).toEqual({
			urgency: 7,
			importance: 3,
			title: "Time",
			id: "TR",
		});
		expect(newItems.topRight.length).toBe(0);
	});

	test("moved up", () => {
		const items = [
			{
				urgency: 7,
				importance: 3,
				title: "Time",
				id: "TR",
			},
			{
				urgency: 7,
				importance: 4,
				title: "No Time",
				id: "Not",
			},
		];
		expect(quadrants(items).bottomLeft.length).toEqual(2);

		const reordered = reorderOnLocationChange(
			{
				previousQuadrant: {
					index: 1,
					droppableId: "bottomLeft",
				},
				newQuadrant: {
					index: 2,
					droppableId: "bottomLeft",
				},
				itemId: "TR",
			},
			items,
			getItemById,
			["Not", "TR"]
		);
		const newItems: quadrantsType = quadrants(reordered);
		expect(newItems.bottomLeft.length).toBe(2);
		expect(newItems.bottomLeft.find((i) => i.id === "TR")).toEqual({
			urgency: 10,
			importance: 3,
			title: "Time",
			id: "TR",
		});
		expect(newItems.topRight.length).toBe(0);
	});

	test("moved down", () => {
		const items = [
			{
				urgency: 7,
				importance: 3,
				title: "Time",
				id: "TR",
			},
			{
				urgency: 7,
				importance: 4,
				title: "No Time",
				id: "Not",
			},
		];
		expect(quadrants(items).bottomLeft.length).toEqual(2);

		const reordered = reorderOnLocationChange(
			{
				previousQuadrant: {
					index: 3,
					droppableId: "bottomLeft",
				},
				newQuadrant: {
					index: 5,
					droppableId: "bottomLeft",
				},
				itemId: "TR",
			},
			items,
			getItemById,
			["TR", "NOT"]
		);
		const newItems: quadrantsType = quadrants(reordered);
		expect(newItems.bottomLeft.length).toBe(2);
		expect(newItems.bottomLeft.find((i) => i.id === "TR")).toEqual({
			urgency: 6,
			importance: 3,
			title: "Time",
			id: "TR",
		});
		expect(newItems.topRight.length).toBe(0);
	});
});

describe("isQuadrantChange", () => {
	test("yes", () => {
		expect(
			isQuadrantChange({
				previousQuadrant: {
					index: 0,
					droppableId: "topLeft",
				},
				newQuadrant: {
					index: 0,
					droppableId: "topRight",
				},
				itemId: "1",
			})
		).toBeTruthy();
	});
	test("no", () => {
		expect(
			isQuadrantChange({
				previousQuadrant: {
					index: 0,
					droppableId: "topRight",
				},
				newQuadrant: {
					index: 0,
					droppableId: "topRight",
				},
				itemId: "1",
			})
		).toBeFalsy();
	});
});

describe("isHigher", () => {
	it("isHigher", () => {
		expect(
			isHigher({
				previousQuadrant: {
					index: 0,
					droppableId: "topLeft",
				},
				newQuadrant: {
					index: 2,
					droppableId: "topLeft",
				},
				itemId: "1",
			})
		).toBeTruthy();
	});
	it("is not isHigher", () => {
		expect(
			isHigher({
				previousQuadrant: {
					index: 5,
					droppableId: "topRight",
				},
				newQuadrant: {
					index: 3,
					droppableId: "topRight",
				},
				itemId: "1",
			})
		).toBeFalsy();
	});
});
