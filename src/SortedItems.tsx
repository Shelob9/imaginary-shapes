import React from "react";
import { ItemsContext } from "./ItemsContext";
import quadrants from "./sorter/quadrants";
import { isImportant, isFun, isUrgent } from "./sorter/is";
import { Grid, Box, Styled, Card, Text, Label } from "theme-ui";
import { savedItemsCollection, SavedItem } from "./sorter/types";
import Emoji from "react-emoji-render";
import { dragAndDropState } from "./DragAndDrop/types";
import DragAndDrop from "./DragAndDrop/DragAndDrop";

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

export function useQuadrants() {
	const { items } = React.useContext(ItemsContext);

	const {
		topLeft, //Urgent and important
		topRight, //Important not urgent
		bottomLeft, //Urgent, not important
		bottomRight, //Not urgent or important
	} = quadrants(items);

	const asDndState = (): dragAndDropState => {
		let _items = {};
		items.forEach((item: SavedItem) => {
			_items[item.id] = {
				id: item.id,
				content: item.title,
			};
		});

		const columns = {
			topLeft: {
				id: "topLeft",
				title: "Top Left",
				itemIds:
					!topLeft || !topLeft.length
						? []
						: topLeft.map((item: SavedItem) => item.id),
			},
			topRight: {
				id: "topRight",
				title: "Top Right",
				itemIds:
					!topRight || !topRight.length
						? []
						: topRight.map((item: SavedItem) => item.id),
			},
			bottomLeft: {
				id: "bottomLeft",
				title: "Bottom Left",
				itemIds:
					!bottomLeft || !bottomLeft.length
						? []
						: bottomLeft.map((item: SavedItem) => item.id),
			},
			bottomRight: {
				id: "bottomRight",
				title: "Bottom Right",
				itemIds:
					!bottomRight || !bottomRight.length
						? []
						: bottomRight.map((item: SavedItem) => item.id),
			},
		};

		return {
			items: _items,
			columns,
			columnOrder: ["topLeft", "topRight", "bottomLeft", "bottomRight"],
		};
	};
	return {
		topLeft: topLeft as savedItemsCollection,
		topRight: topRight as savedItemsCollection,
		bottomLeft: bottomLeft as savedItemsCollection,
		bottomRight: bottomRight as savedItemsCollection,
		asDndState,
	};
}
export default function (props: { lock: boolean }) {
	const { asDndState } = useQuadrants();
	const {
		items,
		isLoading,
		LoadingIndicator,
		SavingIndicator,
	} = React.useContext(ItemsContext);

	const middleware = (update: dragAndDropState) => {
		console.log(update, items);
		return update;
	};
	return (
		<React.Fragment>
			<LoadingIndicator />
			<SavingIndicator />
			{!isLoading && (
				<DragAndDrop initialData={asDndState()} stateMiddleWare={middleware} />
			)}
		</React.Fragment>
	);
}
