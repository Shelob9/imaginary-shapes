import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DragAndDrop from "./DragAndDrop";
import initialData from "./initial-data";
import { AppConfig, UserSession } from "blockstack";
import { UserSessionProvider } from "../UserSessionProvider";
import { ItemsProvider } from "../ItemsContext";
const appConfig = new AppConfig([], "fake.com");
const userSession = new UserSession({ appConfig: appConfig });
const MockApp = (props: { children: any }) => (
	<UserSessionProvider userSession={userSession}>
		<ItemsProvider>{props.children}</ItemsProvider>
	</UserSessionProvider>
);
describe("DragAndDrop component", () => {
	let props = { initialData };
	it.skip(" DragAndDrop matches snapshot", () => {
		props = { ...props };
		const { container } = render(
			<MockApp>
				<ItemsProvider>
					<DragAndDrop {...props} />
				</ItemsProvider>
			</MockApp>
		);

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
