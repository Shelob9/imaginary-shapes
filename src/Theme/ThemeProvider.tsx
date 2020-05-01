//@eslint-ignore
import React from "react";
import { ThemeProvider } from "theme-ui";
/** @jsx jsx */
import { jsx } from "theme-ui";
const blackTint = "#262626";
const whiteTint = "#d9d9d9";
const white = "#fff";

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
	// from typography overrideThemeStyles
	a: {
		color: blackTint,
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
		modes: {
			dark: {
				primary: whiteTint,
				text: whiteTint,
				background: blackTint,
			},
		},
	},
	styles,
};

export default (props: { children: any }) => (
	<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);
