/** @jsx jsx */
import { jsx, Divider, Box, Styled } from "theme-ui";
import { ToggleColorMode, A } from "../Theme/index";
import LoginOrLogout from "./LoginOrLogout";
export default function () {
	return (
		<Box as={"header"}>
			<Styled.h1>Imaginary Machines</Styled.h1>
			<Box as={"nav"} sx={{ display: "inline" }}>
				<A to="/items">Organize Items</A>
			</Box>
			<LoginOrLogout />
			<ToggleColorMode />
			<Divider />
		</Box>
	);
}
