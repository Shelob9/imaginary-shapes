/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";
import PageTemplate from "./PageTemplate";
const FAQItem = (props: { q: string; children: any; link?: string }) => (
	<Box>
		<Styled.h3>{props.q}</Styled.h3>
		{props.children}
		{props.link && <Styled.a href={props.link}>Learn More</Styled.a>}
	</Box>
);

const FAQPage = () => {
	return (
		<PageTemplate title={"Imaginary Shapes: FAQ"}>
			<FAQItem q={"What Is This?"}>
				<Styled.p>
					This is a web application Josh built to help him priortize his
					decisions and track his habbits.
				</Styled.p>
			</FAQItem>
			<FAQItem q={"Can I Use It?"}>
				<Styled.p>
					Yes. You may also{" "}
					<Styled.a href={"https://github.com/Shelob9/imaginary-shapes"}>
						fork it.
					</Styled.a>
				</Styled.p>
			</FAQItem>
			<FAQItem
				q={"What Is Blockstack?"}
				link={"https://docs.blockstack.org/faqs/allfaqs"}
			>
				<Styled.p>
					Blockstack is a decentralized compute network allows users to own
					their own data that they can take with them from app to app in the
					ecosystem.
				</Styled.p>
			</FAQItem>
			<FAQItem
				q={"Where Is My Data Stored?"}
				link={"https://docs.blockstack.org/storage/overview.html"}
			>
				<Styled.p>
					In the cloud, like every other app. The cool part about using
					Blockstack is that your data is encrypted so no one, including me can
					read it or sell it. It's yours not mine or Amazons'.
				</Styled.p>
			</FAQItem>
			<FAQItem
				q={"How Is This App Monetized?"}
				link={"https://docs.blockstack.org/storage/overview.html"}
			>
				<Styled.p>
					Currently it is not. I might submit this app for{" "}
					<Styled.a href="https://blog.blockstack.org/introducing-app-mining/">
						Blockstack's "app mining" program
					</Styled.a>
					. I will likely write some content about how I built this on{" "}
					<Styled.a href="https://dev.to/shelob9">Dev.to or whatever</Styled.a>,
					which I may benefit from in some ways.
				</Styled.p>
			</FAQItem>
			<FAQItem q={"Who Made This And Why?"} link={"https://joshpress.net"}>
				<Styled.p>
					Hi, I'm Josh. I'm a JavaScript and PHP developer from Pittsburgh, PA.
					I pulled this web application together during Coronovirus pandmemic
					using a bunch of stuff I wrote on airplanes while half asleep during
					the previous years.
				</Styled.p>
			</FAQItem>
			<FAQItem q={"Where Can I Report A Bug?"}>
				<Styled.p>
					You may report bugs on{" "}
					<Styled.a href="https://github.com/Shelob9/imaginary-shapes/issues">
						Github
					</Styled.a>
				</Styled.p>
			</FAQItem>
			<FAQItem q={"Why Is This Application Called Imaginary Shapes?"}>
				<Styled.p>I don't recall.</Styled.p>
			</FAQItem>
		</PageTemplate>
	);
};

export default FAQPage;
