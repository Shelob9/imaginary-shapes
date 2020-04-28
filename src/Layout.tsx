/** @jsx jsx */
import { jsx, Box, Container } from "theme-ui";
export function Layout(props: {
	children: any;
	Header: () => any;
	Sidebar: () => any;
}) {
	const { Header, Sidebar } = props;

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
					Footer
				</Box>
			</Box>
		</Container>
	);
}
