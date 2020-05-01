import React, { ChangeEvent, Fragment } from "react";

import { SavedItem } from "../sorter/types";
import Title from "./Title";

import shortid from "shortid";

export default function New(props: {
	titleText?: string;
	submitText?: string;
	onSave: (item: SavedItem) => void;
}) {
	const [title, setTile] = React.useState<string>("");

	const handleSubmit = () => {
		props.onSave({
			id: shortid.generate() as string,
			title,
			fun: 0,
			importance: 0,
			urgency: 0,
		});
	};
	return (
		<form
			onSubmit={(e: React.FormEvent) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<Title title={title} setTitle={setTile} />
			<input
				type={"submit"}
				value={props.titleText ? props.titleText : "Create"}
			/>
		</form>
	);
}
