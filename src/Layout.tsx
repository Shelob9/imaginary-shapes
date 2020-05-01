/** @jsx jsx */
import { jsx, Box, Container, Styled } from "theme-ui";
import { useContext } from "react";
import UserSessionContext from "./UserSessionProvider";
export function Layout(props: {
	children: any;
	Header: () => any;
	Sidebar: () => any;
}) {
	const { Header, Sidebar } = props;
	const { isLoggedIn } = useContext(UserSessionContext);
	return (
		<Container p={4}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}
			>
				<Box
					sx={{
						width: "100%",
					}}
				>
					<Header />
				</Box>

				<Box
					sx={{
						width: "100%",
						flex: "1 1 auto",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
						}}
					>
						{isLoggedIn && (
							<Box
								as={"aside"}
								sx={{
									flexGrow: 1,
									flexBasis: "sidebar",
									minWidth: "300px",
								}}
							>
								<Sidebar />
							</Box>
						)}

						<Box
							as={"main"}
							sx={{
								flexGrow: 99999,
								flexBasis: 0,
								minWidth: 320,
							}}
						>
							{props.children}
						</Box>
					</Box>
				</Box>
				<Box
					as={"footer"}
					sx={{
						width: "100%",
					}}
				>
					<Styled.p>
						<Styled.a
							sx={{ marginRight: 2 }}
							href={"https://github.com/Shelob9/imaginary-shapes"}
						>
							View Source
						</Styled.a>
						<Styled.a href={"https://joshpress.net"}>Josh</Styled.a>
					</Styled.p>
				</Box>
			</Box>
		</Container>
	);
}
