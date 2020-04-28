/** @jsx jsx */
import { jsx, Divider, Box, Styled } from "theme-ui";
//import { UserSession } from "blockstack";

export default function (props: {
	//userSesssion: UserSession;
	//handleSignOut: () => void;
}) {
	console.log(props);
	return (
		<Box as={"header"}>
			<Styled.h1>Imaginary Machines</Styled.h1>
			<Divider />
		</Box>
	);
}
