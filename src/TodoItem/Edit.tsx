import React, { ChangeEvent, Fragment } from "react";

import { Item } from "../sorter/types";
import Title from "./Title";
import useItem from "./useItem";
import InputField from "../InputField";
import { Input, Styled, Box } from "theme-ui";
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
		<Styled.div>
			<Styled.h3>{titleText}</Styled.h3>
			<Box as="form" onSubmit={handleSave} aria-label={titleText}>
				<Title
					{...{
						type: "input",
						id: "title",
						label: "Title",
						setTitle: (title) => updateItem({ ...item, title }),
						title,
					}}
				/>
				<InputField
					{...{
						type: "number",
						id: "urgency",
						label: "Urgency",
						value: urgency,
						onChange: (urgency: number) => updateItem({ ...item, urgency }),
					}}
				/>
				<InputField
					{...{
						type: "number",
						id: "importance",
						label: "Importance",
						value: importance,
						onChange: (importance: number) =>
							updateItem({ ...item, importance }),
					}}
				/>
				<InputField
					{...{
						type: "number",
						id: "fun",
						label: "Fun",
						value: fun,
						onChange: (fun: number) => updateItem({ ...item, fun }),
					}}
				/>
				<Input
					id={"save"}
					value={submitText}
					onClick={(event: React.MouseEvent) => {
						event.preventDefault();
						onSave(item);
					}}
					type={"submit"}
				/>
			</Box>
		</Styled.div>
	);
}
