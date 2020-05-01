import { Box, Label } from "theme-ui";
import React, { Fragment } from "react";
import Emoji from "react-emoji-render";
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

export { ThumbToggle, Thumb };
