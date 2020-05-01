/** @jsx jsx */
import { jsx } from "theme-ui";
import { useContext } from "react";
import { Styled } from "theme-ui";
import { SavedItem } from "../sorter/types";
import { A } from "../Theme/index";
import { ItemsContext } from "../ItemsContext";
import Widget from "./Widget";

export default function ItemsPage() {
	const { items, LoadingIndicator, SavingIndicator } = useContext(ItemsContext);

	return (
		<Widget title={"Items Being Tracked"}>
			<LoadingIndicator />
			<SavingIndicator />
			<Styled.ul>
				{items.map((item: SavedItem) => (
					<Styled.li
						key={item.id}
						sx={{
							maxWidth: 256,
						}}
					>
						<A to={`/items/${item.id}`}>{item.title}</A>
					</Styled.li>
				))}
			</Styled.ul>
		</Widget>
	);
}
