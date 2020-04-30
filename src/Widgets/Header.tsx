/** @jsx jsx */
import { jsx, Divider, Box, Styled } from "theme-ui";
import { ToggleColorMode, A } from "../Theme/index";
import LoginOrLogout from "./LoginOrLogout";
import { useContext } from "react";
import UserSessionContext from "../UserSessionProvider";
export default function () {
	const { isLoggedIn } = useContext(UserSessionContext);
	return (
		<Box as={"header"}>
			<Styled.h1 sx={{ display: "inline", mr: 12 }}>
				<A to={"/"}>Imaginary Shapes</A>
			</Styled.h1>
			<Box as={"span"} sx={{ display: "inline", mr: 12 }}>
				<LoginOrLogout />
			</Box>
			<Box as={"span"} sx={{ display: "inline", mr: isLoggedIn ? 12 : 0 }}>
				<ToggleColorMode />
			</Box>
			<Box as={"span"} sx={{ display: "inline" }}>
				{isLoggedIn ? <A to="/items">Organize Items</A> : null}
			</Box>
			<Divider />
		</Box>
	);
}
