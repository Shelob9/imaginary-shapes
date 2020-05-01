import React, { ChangeEvent } from "react";

import { Item, SavedItem } from "../sorter/types";
import Title from "./Title";
import useItem from "./useItem";
import InputField from "../InputField";
import { Input, Styled, Box, Slider, Label } from "theme-ui";
import { ThumbToggle } from "./Thumbs";
import { isUrgent, isImportant, isFun } from "../sorter/is";

export function Edit(props: {
	titleText: string;
	submitText: string;
	onSave: (item: Item) => void;
	initialItem?: Item;
	activeItemId: string;
}) {
	const { titleText, onSave, submitText, initialItem } = props;

	const { item, updateItem } = useItem(initialItem ? initialItem : null);

	React.useEffect(() => {
		if (initialItem) {
			updateItem(initialItem);
		} else {
			updateItem({ title: "", importance: 0, urgency: 0 });
		}
	}, [props.activeItemId]);
	function handleSave() {
		return onSave(item);
	}

	const { title, urgency, importance, fun } = item;

	return (
		<Styled.div>
			<Styled.h3>{titleText}</Styled.h3>
			<Box
				as="form"
				onSubmit={handleSave}
				aria-label={titleText}
				key={props.activeItemId}
			>
				<Title
					{...{
						type: "input",
						id: "title",
						label: "Title",
						setTitle: (title) => updateItem({ ...item, title }),
						title,
					}}
				/>
				<Box as={"div"}>
					<Label htmlFor={"fun"}>
						<ThumbToggle
							isUp={isFun(item)}
							onClick={() => {
								updateItem({
									...item,
									fun: isFun(item) ? 0 : 10,
								});
							}}
						>
							Fun
						</ThumbToggle>
					</Label>
					<Slider
						defaultValue={fun}
						value={fun}
						min={0}
						max={10}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							updateItem({ ...item, fun: parseInt(e.target.value, 10) });
						}}
					/>
				</Box>
				<Box as={"div"}>
					<Label htmlFor={"urgency"}>
						<ThumbToggle
							isUp={isUrgent(item)}
							onClick={() => {
								updateItem({
									...item,
									urgency: isUrgent(item) ? 0 : 10,
								});
							}}
						>
							Urgency
						</ThumbToggle>
					</Label>
					<Slider
						defaultValue={urgency}
						value={urgency}
						min={0}
						max={10}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							updateItem({ ...item, urgency: parseInt(e.target.value, 10) });
						}}
					/>
				</Box>
				<Box as={"div"}>
					<Label htmlFor={"importance"}>
						<ThumbToggle
							isUp={isImportant(item)}
							onClick={() => {
								updateItem({
									...item,
									importance: isImportant(item) ? 0 : 10,
								});
							}}
						>
							Importance
						</ThumbToggle>
					</Label>
					<Slider
						defaultValue={importance}
						value={importance}
						min={0}
						max={10}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							updateItem({ ...item, importance: parseInt(e.target.value, 10) });
						}}
					/>
				</Box>
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
