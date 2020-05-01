/** @jsx jsx */
import { jsx, Input, Label } from "theme-ui";
import { ChangeEvent } from "react";

type valueType = string | number;
export default function (props: {
	id: string;
	type: "input" | "number" | "date" | "submit";
	value: valueType;
	onChange: (value: valueType) => void;
	label: string;
}) {
	let additionalProps =
		"number" === props.type ? { min: 0, step: 1, max: 10 } : {};
	return (
		<div>
			<Label name={props.id} htmlFor={props.id}>
				{props.label}
			</Label>

			<Input
				mb={3}
				id={props.id}
				value={props.value}
				required
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					props.onChange(e.target.value)
				}
				type={props.type}
				{...additionalProps}
			/>
		</div>
	);
}
