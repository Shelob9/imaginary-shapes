import React from "react";
import { Box, useColorMode } from "theme-ui";
import PageTemplate from "./PageTemplate";
import { ItemThumb } from "../TodoItem/Thumbs";
import { ItemsContext } from "../ItemsContext";
import { doneOnly } from "../sorter/sorters";
import { SavedItem } from "../sorter/types";

const CompletedItemsPage = () => {
	const { items } = React.useContext(ItemsContext);
	const completedItems = doneOnly(items);
	const [colorMode] = useColorMode();
	const isDark = colorMode === `dark`;
	return (
		<PageTemplate title={"Completed Items"}>
			<Box>
				{completedItems &&
					completedItems.map((item: SavedItem) => (
						<Box
							key={item.id}
							sx={{
								margin: `8px`,
								padding: `8px`,
								//Conditonal makes shadow darker (less transparent) in dark mode
								boxShadow: `rgba(0, 0, 0, ${
									isDark ? "0.6" : "0.125"
								}) 0px 0px 8px`,
							}}
						>
							<ItemThumb item={item} />
						</Box>
					))}
			</Box>
		</PageTemplate>
	);
};

export default CompletedItemsPage;
