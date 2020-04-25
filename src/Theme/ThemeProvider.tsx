import React from "react";
import {
	useColorMode,
	Box,
	Button,
	Flex,
	Styled,
	ThemeProvider,
} from "theme-ui";
/** @jsx jsx */
import { jsx } from "theme-ui";
const blackTint = "#262626";
const whiteTint = "#d9d9d9";
const white = "#fff";

const theme = {
	fonts: {
		body: "system-ui, sans-serif",
		heading: '"Avenir Next", sans-serif',
		monospace: "Menlo, monospace",
	},
	useColorSchemeMediaQuery: true,
	colors: {
		text: blackTint,
		background: white,
		primary: "#07c",
		secondary: "yellow",
		modes: {
			dark: {
				text: whiteTint,
				background: blackTint,
				primary: "#0cf",
			},
		},
	},
	styles: {
		a: {
			color: "primary",
		},
	},
};

export const ToggleColorMode = () => {
	const [colorMode, setColorMode] = useColorMode();
	return (
		<Button
			onClick={(e: React.MouseEvent) => {
				e.preventDefault();
				setColorMode(colorMode === "default" ? "dark" : "default");
			}}
		>
			{colorMode === "default" ? "Dark" : "Light"}
		</Button>
	);
};

export default (props: { children: any }) => (
	<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);
