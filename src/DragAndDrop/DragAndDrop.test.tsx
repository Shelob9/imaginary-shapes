import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DragAndDrop from "./DragAndDrop";
import initialData from "./initial-data";

describe("DragAndDrop component", () => {
	let props = { initialData };
	it(" DragAndDrop matches snapshot", () => {
		props = { ...props };
		const { container } = render(<DragAndDrop {...props} />);
		expect(container).toMatchSnapshot();
	});
	it.skip("DragAndDrop calls on change", () => {
		const onChange = jest.fn();
		props = { ...props };
		const { getByLabelText } = render(
			<DragAndDrop {...props} onChange={onChange} />
		);
		fireEvent.change(getByLabelText("Label Text"), {
			target: { value: "Stillness" },
		});
		expect(onChange).toBeCalledTimes(1);
		expect(onChange).toBeCalledWith("Stillness");
	});
});
