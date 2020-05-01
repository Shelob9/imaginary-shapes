import React from "react";
import { Box, Text } from "theme-ui";
import PageTemplate from "./PageTemplate";
import { useQuadrants } from "../SortedItems";
import { A } from "../Theme/index";
import { ItemThumb } from "../TodoItem/Thumbs";
import NewItem from "../TodoItem/New";
import { ItemsContext } from "../ItemsContext";
const NowPage = () => {
	const { getFirstItem } = useQuadrants();
	const item = getFirstItem();
	const { saveNewItem } = React.useContext(ItemsContext);
	return (
		<PageTemplate title={"Do This Thing Now"}>
			<Box>
				{item ? (
					<ItemThumb item={item} />
				) : (
					<NewItem
						onSave={saveNewItem}
						titleText={"Create New Item"}
						submitText={"Save"}
					/>
				)}
			</Box>
		</PageTemplate>
	);
};

export default NowPage;
