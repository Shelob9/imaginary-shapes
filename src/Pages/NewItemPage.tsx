import React from "react";
import PageTemplate from "./PageTemplate";
import NewItem from "../TodoItem/New";
import { ItemsContext } from "../ItemsContext";
const NewItemPage = () => {
	const { saveNewItem } = React.useContext(ItemsContext);
	return (
		<PageTemplate title={"New Item"}>
			<NewItem
				onSave={saveNewItem}
				titleText={"Create New Item"}
				submitText={"Save"}
			/>
		</PageTemplate>
	);
};

export default NewItemPage;
