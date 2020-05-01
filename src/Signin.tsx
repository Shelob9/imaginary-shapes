import React from "react";
import LoginOrLogout from "./Widgets/LoginOrLogout";
import { Box, Styled } from "theme-ui";
export default function Signin() {
	return (
		<Box sx={{ textAlign: "center" }}>
			<Styled.p>
				<LoginOrLogout>Sign In With BlockStack</LoginOrLogout>
			</Styled.p>
			<Styled.p>
				<Styled.a href="https://blockstack.org">What Is Blockstack?</Styled.a>
			</Styled.p>
		</Box>
	);
}
