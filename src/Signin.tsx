import React from "react";
import LoginOrLogout from "./Widgets/LoginOrLogout";
import { A } from "./Theme/index";
import { Box, Container } from "theme-ui";
export default function Signin() {
	return (
		<Container>
			<Box>
				<LoginOrLogout>Sign In With BlockStack</LoginOrLogout>
			</Box>
			<Box>
				<A to={"https://blockstack.org"}>What Is Blockstack?</A>
			</Box>
		</Container>
	);
}
