/** @jsx jsx */
import { jsx, Divider, Box, Styled, Flex } from "theme-ui";
import { A } from "../Theme/index";
import LoginOrLogout from "./LoginOrLogout";
import { useContext } from "react";
import UserSessionContext from "../UserSessionProvider";
import ColorModeSwitch from "./ColorModeSwitch";
export default function () {
	const { isLoggedIn } = useContext(UserSessionContext);
	return (
		<Box as={"header"}>
			<Flex>
				<Box p={2} sx={{ flex: "1 1 auto" }}>
					<Styled.h1 sx={{ display: "inline", mr: 12 }}>
						Imaginary Shapes
					</Styled.h1>
				</Box>
				<Box p={2}>
					<Box as={"span"} sx={{ display: "inline", mr: 12 }}>
						<LoginOrLogout />
					</Box>
					<Box as={"span"} sx={{ display: "inline", mr: isLoggedIn ? 12 : 0 }}>
						<ColorModeSwitch />
					</Box>
				</Box>
			</Flex>
			<Divider />
		</Box>
	);
}
