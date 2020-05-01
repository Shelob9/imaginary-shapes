//@eslint-ignore
import React from "react";
import { ThemeProvider } from "theme-ui";
/** @jsx jsx */
import { jsx } from "theme-ui";
export const blackTint = "#262626";
export const whiteTint = "#d9d9d9";
export const white = "#fff";

const styles = {
	root: {
		fontFamily: `body`,
	},
	pre: {
		variant: `prism`,
		fontFamily: `monospace`,
		tabSize: 4,
		hyphens: `none`,
		marginBottom: 2,
		color: `white`,
		bg: `prism.background`,
		overflow: `auto`,
		borderRadius: 10,
		p: 3,
	},
	code: {
		fontFamily: `monospace`,
		// from typography overrideThemeStyles
		// "h1 code, h2 code, h3 code, h4 code, h5 code, h6 code"
		fontSize: `inherit`,
	},
	inlineCode: {
		borderRadius: `0.3em`,
		color: `secondary`,
		bg: `highlight`,
		paddingTop: `0.15em`,
		paddingBottom: `0.05em`,
		paddingX: `0.2em`,
	},
	hr: {
		borderColor: `muted`,
	},
	p: {
		code: {
			fontSize: `inherit`,
		},
	},
	li: {
		code: {
			fontSize: `inherit`,
		},
	},
	blockquote: {
		color: `inherit`,
		borderLeftColor: `inherit`,
		opacity: 0.8,
		"&.translation": {
			fontSize: `1em`,
		},
	},
	a: {
		color: "secondary",
	},
};

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
		primary: blackTint,
		secondary: blackTint,
		modes: {
			dark: {
				primary: whiteTint,
				secondary: whiteTint,
				text: whiteTint,
				background: blackTint,
			},
		},
	},
	buttons: {
		primary: {
			color: "background", // use the page background color for an inverted effect
			bg: "primary",
		},
	},
	styles,
};

export default (props: { children: any }) => (
	<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);
