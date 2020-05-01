import React from "react";
import ReactSwitch from "react-switch";
import { useColorMode } from "theme-ui";
export const Switch = (props) => <ReactSwitch {...props} />;

Switch.defaultProps = {
	checkedIcon: false,
	uncheckedIcon: false,
	height: 24,
	width: 48,
	handleDiameter: 24,
	offColor: `#000`,
	onColor: `#000`,
	boxShadow: `inset 0 0 0 1px #000`,
};

export default function () {
	const [colorMode, setColorMode] = useColorMode();
	const isDark = colorMode === `dark`;
	const toggleColorMode = () => {
		setColorMode(isDark ? `light` : `dark`);
	};
	return (
		<Switch
			aria-label="Toggle dark mode"
			checked={isDark}
			onChange={toggleColorMode}
		/>
	);
}
