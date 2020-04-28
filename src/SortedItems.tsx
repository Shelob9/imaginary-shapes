import React from "react";
import { ItemsContext } from "./ItemsContext";
import quadrants from "./sorter/quadrants";
import { isImportant, isFun, isUrgent } from "./sorter/is";
import { Grid, Box, Styled, Card, Text, Label } from "theme-ui";
import { savedItemsCollection, SavedItem } from "./sorter/types";
import Emoji from "react-emoji-render";

const Thumb = (props: { isUp: true | false }) => {
	return (
		<React.Fragment>
			{props.isUp ? <Emoji text="👍" /> : <Emoji text="👎" />}
		</React.Fragment>
	);
};

const ThumbToggle = (props: {
	isUp: boolean;
	onClick: () => void;
	children: any;
}) => (
	<Box as="div" onClick={props.onClick}>
		<Label>
			{props.children} <Thumb isUp={props.isUp} />
		</Label>
	</Box>
);
const OneItem = (props: { item: SavedItem; lock: boolean }) => {
	const { updateItem } = React.useContext(ItemsContext);
	const { item } = props;

	const noChange = () => {};
	const onToggleFun = props.lock
		? noChange
		: () => {
				updateItem({ ...item, fun: !isFun(item) ? 10 : 0 });
		  };

	const onToggleUrgent = props.lock
		? noChange
		: () => {
				updateItem({ ...item, urgency: !isUrgent(item) ? 10 : 0 });
		  };

	const onToggleImportant = props.lock
		? noChange
		: () => {
				updateItem({ ...item, importance: !isImportant(item) ? 10 : 0 });
		  };

	return (
		<Card
			sx={{
				maxWidth: 256,
				border: `1px solid black`,
			}}
		>
			<ThumbToggle onClick={onToggleFun} isUp={isFun(item)}>
				Is Fun
			</ThumbToggle>
			<ThumbToggle onClick={onToggleUrgent} isUp={isUrgent(item)}>
				Is Urgent
			</ThumbToggle>
			<ThumbToggle onClick={onToggleImportant} isUp={isImportant(item)}>
				Is Important
			</ThumbToggle>
			<Text>{item.title}</Text>
		</Card>
	);
};

const ItemsList = (props: { items: savedItemsCollection; lock: boolean }) => (
	<React.Fragment>
		{props.items.map((item: SavedItem) => (
			<OneItem key={item.id} item={item} lock={props.lock} />
		))}
	</React.Fragment>
);

function useQuadrants() {
	const { items } = React.useContext(ItemsContext);

	const {
		topLeft, //Urgent and important
		topRight, //Important not urgent
		bottomLeft, //Urgent, not important
		bottomRight, //Not urgent or important
	} = quadrants(items);

	return {
		topLeft: topLeft as savedItemsCollection,
		topRight: topRight as savedItemsCollection,
		bottomLeft: bottomLeft as savedItemsCollection,
		bottomRight: bottomRight as savedItemsCollection,
	};
}
export default function (props: { lock: boolean }) {
	const {
		topLeft, //Urgent and important
		topRight, //Important not urgent
		bottomLeft, //Urgent, not important
		bottomRight, //Not urgent or important
	} = useQuadrants();
	return (
		<Grid gap={2} columns={[2]}>
			<Grid>
				<Box p={2}>
					<Styled.h3>Urgent & Important</Styled.h3>
					<ItemsList items={topLeft} lock={props.lock} />
				</Box>
				<Box p={2}>
					<Styled.h3>Important, Not Urgent</Styled.h3>
					<ItemsList items={topRight} lock={props.lock} />
				</Box>
			</Grid>
			<Grid>
				<Box p={2}>
					<Styled.h3>Urgent, not important</Styled.h3>
					<ItemsList items={bottomLeft} lock={props.lock} />
				</Box>
				<Box p={2}>
					<Styled.h3>Not urgent or important</Styled.h3>
					<ItemsList items={bottomRight} lock={props.lock} />
				</Box>
			</Grid>
		</Grid>
	);
}
