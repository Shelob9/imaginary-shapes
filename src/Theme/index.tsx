/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { useHistory } from "react-router-dom";
export function A(props: { to: string; children: string; title?: string }) {
	const history = useHistory();

	const onClick = (e: React.ChangeEvent<any>) => {
		e.preventDefault();
		history.push(props.to);
	};

	return (
		<Styled.a href={props.to} title={props.title} onClick={onClick}>
			{props.children}
		</Styled.a>
	);
}
