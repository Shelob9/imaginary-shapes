import React from "react";
import { Container, Box, Styled, Grid } from "theme-ui";
export const PageTemplate = (props: { children: any; title: string }) => (
	<Container>
		<Box
			sx={{
				maxWidth: 1200,
				mx: "auto",
				px: 3,
				py: 4,
			}}
		>
			<Grid>
				<Styled.h1>{props.title}</Styled.h1>
				{props.children}
			</Grid>
		</Box>
	</Container>
);

export default PageTemplate;
