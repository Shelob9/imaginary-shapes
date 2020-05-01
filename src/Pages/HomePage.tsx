/** @jsx jsx */
import { jsx, Box, Button, Grid, Styled, Container } from "theme-ui";
import Signin from "../Signin";
import { useContext } from "react";
import UserSessionContext from "../UserSessionProvider";
import { useHistory } from "react-router-dom";
export default function HomePage() {
	const { isLoggedIn } = useContext(UserSessionContext);
	const history = useHistory();
	return (
		<Container>
			<Box
				sx={{
					maxWidth: 512,
					mx: "auto",
					px: 3,
					py: 4,
				}}
			>
				<Grid sx={{ textAlign: "center" }}>
					<Styled.h1>Imaginary Shapes</Styled.h1>
					<Styled.p>A prioritization and habbit forming game. </Styled.p>
					<Box p={2}>
						{!isLoggedIn ? (
							<Signin />
						) : (
							<Button onClick={() => history.push("/items")}>
								Organize Items
							</Button>
						)}
					</Box>
				</Grid>
			</Box>
		</Container>
	);
}
