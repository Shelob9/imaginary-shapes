import React from "react";
import { Box, Styled } from "theme-ui";
const Widget = (props: { children: any; title: string }) => (
	<Box as="aside">
		<Styled.h3>{props.title}</Styled.h3>
		{props.children}
	</Box>
);

export default Widget;
