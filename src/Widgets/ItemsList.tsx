/** @jsx jsx */
import { jsx } from "theme-ui";
import { Styled } from "theme-ui";
import { SavedItem } from "../sorter/types";
import { A } from "../Theme/index";
import Widget from "./Widget";
import { useQuadrants } from "../SortedItems";

export default function ItemsList() {
	const { topLeft, topRight, bottomLeft, bottomRight } = useQuadrants();
	return (
		<Widget title={"Items Being Tracked"}>
			<Styled.ul>
				{topLeft &&
					topLeft.map((item: SavedItem) => (
						<Styled.li
							key={item.id}
							sx={{
								maxWidth: 256,
							}}
						>
							<A to={`/items/${item.id}`}>{item.title}</A>
						</Styled.li>
					))}
				{topRight &&
					topRight.map((item: SavedItem) => (
						<Styled.li
							key={item.id}
							sx={{
								maxWidth: 256,
							}}
						>
							<A to={`/items/${item.id}`}>{item.title}</A>
						</Styled.li>
					))}
				{bottomLeft &&
					bottomLeft.map((item: SavedItem) => (
						<Styled.li
							key={item.id}
							sx={{
								maxWidth: 256,
							}}
						>
							<A to={`/items/${item.id}`}>{item.title}</A>
						</Styled.li>
					))}
				{bottomRight &&
					bottomRight.map((item: SavedItem) => (
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
