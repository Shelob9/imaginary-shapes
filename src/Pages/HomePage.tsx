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
					<Styled.p>A prioritization game. </Styled.p>
					<Box p={2}>
						{!isLoggedIn ? (
							<Signin />
						) : (
							<Button onClick={() => history.push("/items")}>
								Organize Items
							</Button>
						)}
					</Box>
					<Styled.a sx={{ marginRight: 2 }} href={"/faq"}>
						FAQ
					</Styled.a>
					<Styled.h2></Styled.h2>
					<Grid gap={2} columns={[2, "1fr 2fr"]}>
						<Box>
							<Styled.h2>Work On Goals</Styled.h2>
						</Box>
						<Box bg="muted">
							<Styled.p>
								Organize goals, habbits and priorities and track progress on
								them, track progress on them. Helps decide what to work on.
							</Styled.p>
						</Box>
					</Grid>
					<Grid gap={2} columns={[2, "2fr 1fr"]}>
						<Box>
							<Styled.h2>Control The Data</Styled.h2>
						</Box>
						<Box bg="muted">
							<Styled.p>Your data can not be monetized.</Styled.p>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
