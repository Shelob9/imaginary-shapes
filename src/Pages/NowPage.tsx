import React from "react";
import { Box, Text } from "theme-ui";
import PageTemplate from "./PageTemplate";
import { useQuadrants } from "../SortedItems";
import { A } from "../Theme/index";
import { ItemThumb } from "../TodoItem/Thumbs";

const NowPage = () => {
	const { getFirstItem } = useQuadrants();
	const item = getFirstItem();

	return (
		<PageTemplate title={"Do This Thing Now"}>
			<Box>{item ? <ItemThumb item={item} /> : <div>Else</div>} </Box>
		</PageTemplate>
	);
};

export default NowPage;
