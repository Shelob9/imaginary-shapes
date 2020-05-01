import { Box, Label, Text, Styled } from "theme-ui";
import React, { Fragment } from "react";
import Emoji from "react-emoji-render";
import { SavedItem } from "../sorter/types";
import { A } from "../Theme/index";
import { isFun, isUrgent, isImportant } from "../sorter/is";

const Thumb = (props: { isUp: true | false }) => {
	return (
		<Fragment>
			{props.isUp ? <Emoji text="👍" /> : <Emoji text="👎" />}
		</Fragment>
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

const ItemThumb = (props: { item: SavedItem }) => {
	const { item } = props;
	return (
		<Box as="div">
			<Styled.h3>
				<A to={`/items/$item.id}`}>{item.title}</A>
			</Styled.h3>
			<Thumb isUp={isFun(item)} />
			<Thumb isUp={isUrgent(item)} />
			<Thumb isUp={isImportant(item)} />
		</Box>
	);
};

export { ThumbToggle, Thumb, ItemThumb };
