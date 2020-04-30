/** @jsx jsx */
import { jsx, Box, Button, Grid, Styled, Flex } from "theme-ui";
import Signin from "../Signin";
import { useContext } from "react";
import UserSessionContext from "../UserSessionProvider";
import { useHistory } from "react-router-dom";
export default function HomePage() {
	const { isLoggedIn } = useContext(UserSessionContext);
	const history = useHistory();
	return (
		<Box
			sx={{
				maxWidth: 512,
				mx: "auto",
				px: 3,
				py: 4,
			}}
		>
			<Flex>
				<Box p={2} sx={{ flex: "1 1 auto" }}>
					<Styled.h1>Imaginary Shapes</Styled.h1>
				</Box>
				<Box p={2}>
					{!isLoggedIn ? (
						<Signin />
					) : (
						<Button onClick={() => history.push("/items")}>
							Organize Items
						</Button>
					)}
				</Box>
			</Flex>
			<Grid>
				<Box>
					<Styled.h2></Styled.h2>
				</Box>
			</Grid>
		</Box>
	);
}
