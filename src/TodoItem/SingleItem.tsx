import React from "react";
import { ItemsContext } from "../ItemsContext";
import { isImportant, isFun, isUrgent } from "../sorter/is";
import { Box, Card, Text, Label, useColorMode } from "theme-ui";
import { SavedItem } from "../sorter/types";
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
const SingleItem = (props: { item: SavedItem; lock: boolean }) => {
	const { updateItem } = React.useContext(ItemsContext);
	const { item } = props;

	const [colorMode] = useColorMode();
	const isDark = colorMode === `dark`;

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
				margin: `8px`,
				padding: `8px`,
				maxWidth: 256,
				//Conditonal makes shadow darker (less transparent) in dark mode
				boxShadow: `rgba(0, 0, 0, ${isDark ? "0.6" : "0.125"}) 0px 0px 8px`,
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

export default SingleItem;
