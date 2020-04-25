import React from "react";
import InputField from "../InputField";

type P = {
	setTitle: (newValue: string) => void;
	title: string;
};

function Field(props: P) {
	return (
		<InputField
			{...{
				type: "input",
				id: "title",
				label: "Title",
				onChange: (value: string) => props.setTitle(value),
				value: props.title,
			}}
		/>
	);
}
export default function Title(props: P) {
	return <Field {...props} />;
}
