/** @jsx jsx */
import { Styled, jsx } from "theme-ui";
import { A } from "../Theme/index";
import Widget from "./Widget";
const SidebarNav = () => {
	return (
		<Widget title={"Menu"}>
			<Styled.ul role={"nav"}>
				<Styled.li>
					<A to={"/items"}>Organize Items</A>
				</Styled.li>
			</Styled.ul>
		</Widget>
	);
};

export default SidebarNav;
