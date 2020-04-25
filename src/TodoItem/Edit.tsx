import React, { ChangeEvent, Fragment } from "react";

import { Item } from "../sorter/types";
import Title from "./Title";
import useItem from "./useItem";
type valueType = string | number;
export function Input(props: {
	id: string;
	type: "input" | "number" | "date" | "submit";
	value: valueType;
	onChange: (value: valueType) => void;
	label: string;
	input?: React.ComponentType<{}>;
}) {
	return (
		<div>
			<label htmlFor={props.id}>{props.label}</label>
			{props.input ? (
				<Fragment>{props.input}</Fragment>
			) : (
				<input
					id={props.id}
					value={props.value}
					required
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						props.onChange(e.target.value)
					}
					type={props.type}
				/>
			)}
		</div>
	);
}

export function Edit(props: {
	titleText: string;
	submitText: string;
	onSave: (item: Item) => void;
	initialItem?: Item;
}) {
	const { titleText, onSave, submitText, initialItem } = props;

	const { item, updateItem } = useItem(initialItem ? initialItem : null);

	function handleSave() {
		return onSave(item);
	}

	const { title, urgency, importance, due, fun } = item;

	return (
		<div>
			<h3>{titleText}</h3>
			<form onSubmit={handleSave} aria-label={titleText}>
				<Title
					{...{
						type: "input",
						id: "title",
						label: "Title",
						setTitle: (title) => updateItem({ ...item, title }),
						title,
					}}
				/>
				<Input
					{...{
						type: "number",
						id: "urgency",
						label: "Urgency",
						value: urgency,
						onChange: (urgency: number) => updateItem({ ...item, urgency }),
					}}
				/>
				<Input
					{...{
						type: "number",
						id: "importance",
						label: "Importance",
						value: importance,
						onChange: (importance: number) =>
							updateItem({ ...item, importance }),
					}}
				/>
				<Input
					{...{
						type: "number",
						id: "fun",
						label: "Fun",
						value: fun,
						onChange: (fun: number) => updateItem({ ...item, fun }),
					}}
				/>
				<input
					id={"save"}
					value={submitText}
					onClick={(event: React.MouseEvent) => {
						event.preventDefault();
						onSave(item);
					}}
					type={"submit"}
				/>
			</form>
		</div>
	);
}
