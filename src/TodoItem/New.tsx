import React from "react";

import { SavedItem } from "../sorter/types";
import Title from "./Title";

import shortid from "shortid";
import { useHistory } from "react-router-dom";

import { Box, Input, Spinner } from "theme-ui";

export default function New(props: {
	titleText?: string;
	submitText?: string;
	onSave: (item: SavedItem) => void;
}) {
	const [title, setTile] = React.useState<string>("");
	const history = useHistory();
	const [isSaving, setIsSaving] = React.useState(false);
	const handleSubmit = () => {
		setIsSaving(true);
		const id = shortid.generate();
		props.onSave({
			id,
			title,
			fun: 0,
			importance: 0,
			urgency: 0,
		});
		window.setTimeout(() => {
			history.push(`/items/${id}`);
		}, 500);
	};
	return (
		<Box as="form" onSubmit={handleSubmit} aria-label={props.titleText}>
			<Title
				setTitle={isSaving ? () => {} : setTile}
				{...{
					type: "input",
					id: "title",
					label: "Title",
					title,
				}}
			/>
			{isSaving ? (
				<Spinner />
			) : (
				<Input
					id={"save"}
					value={props.submitText}
					onClick={(event: React.MouseEvent) => {
						event.preventDefault();
						handleSubmit();
					}}
					type={"submit"}
				/>
			)}
		</Box>
	);
}
