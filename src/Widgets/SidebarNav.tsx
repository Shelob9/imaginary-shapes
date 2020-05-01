/** @jsx jsx */
import { Styled, jsx } from "theme-ui";
import { A } from "../Theme/index";
import Widget from "./Widget";
const SidebarNav = () => {
	return (
		<Widget title={"Menu"}>
			<Styled.ul role={"nav"}>
				<Styled.li>
					<A to={"/now"}>Now</A>
				</Styled.li>
				<Styled.li>
					<A to={"/items"}>Organize Items</A>
				</Styled.li>
				<Styled.li>
					<A to={"/completed"}>Completed Items</A>
				</Styled.li>
				<Styled.li>
					<A to={"/habbits"}>Track Habbits</A>
				</Styled.li>
			</Styled.ul>
		</Widget>
	);
};

export default SidebarNav;
