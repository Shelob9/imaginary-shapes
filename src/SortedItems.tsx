import React from "react";
import { ItemsContext } from "./ItemsContext";
import quadrants from "./sorter/quadrants";
import { Grid, Box, Styled } from "theme-ui";
import {
	savedItemsCollection,
	SavedItem,
	itemCollection,
	Item,
} from "./sorter/types";

const ItemsList = (props: { items: itemCollection }) => (
	<Styled.ul>
		{props.items.map((item: Item) => (
			<Styled.li
				key={item.title}
				sx={{
					maxWidth: 256,
				}}
			>
				{item.title}
			</Styled.li>
		))}
	</Styled.ul>
);

export default function () {
	const { items } = React.useContext(ItemsContext);
	const {
		topLeft, //Urgent and important
		topRight, //Important not urgent
		bottomLeft, //Urgent, not important
		bottomRight, //Not urgent or important
	} = quadrants(items);

	return (
		<Grid gap={2} columns={[2]}>
			<Grid>
				<Box p={2}>
					<Styled.h3>Urgent & Important</Styled.h3>
					<ItemsList items={topLeft} />
				</Box>
				<Box p={2}>
					<Styled.h3>Important, Not Urgent</Styled.h3>
					<ItemsList items={topRight} />
				</Box>
			</Grid>
			<Grid>
				<Box p={2}>
					<Styled.h3>Urgent, not important</Styled.h3>
					<ItemsList items={bottomLeft} />
				</Box>
				<Box p={2}>
					<Styled.h3>Not urgent or important</Styled.h3>
					<ItemsList items={bottomRight} />
				</Box>
			</Grid>
		</Grid>
	);
}
