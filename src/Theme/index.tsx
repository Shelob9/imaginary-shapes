/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { ItemsContext } from "../ItemsContext";
export function A(props: { to: string; children: string; title?: string }) {
	const history = useHistory();
	const { setActiveItemId } = useContext(ItemsContext);

	const onClick = (e: React.ChangeEvent<any>) => {
		//Make sure active item is not set when loading items page
		if ("/items" === props.to) {
			setActiveItemId("");
		}
		if (
			"https://" !== props.to.substr(0, 8) ||
			"http://" !== props.to.substr(0, 7)
		) {
			e.preventDefault();
			history.push(props.to);
		}
	};

	return (
		<Styled.a href={props.to} title={props.title} onClick={onClick}>
			{props.children}
		</Styled.a>
	);
}
