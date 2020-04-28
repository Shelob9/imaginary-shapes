/** @jsx jsx */
import { jsx } from "theme-ui";
import { useContext } from "react";
import { Styled, Box } from "theme-ui";
import { SavedItem } from "../sorter/types";
import { A } from "../Theme/index";
import { ItemsContext } from "../ItemsContext";
const LoadingIndicator = (props: { isLoading: boolean }) =>
	props.isLoading ? <div>Loading Spinner</div> : null;
const SavingIndicator = (props: { isSaving: boolean }) =>
	props.isSaving ? <div>Saving Spinner</div> : null;

export default function ItemsPage() {
	const { items, isLoading, isSaving } = useContext(ItemsContext);

	return (
		<Box>
			<Styled.h3>Items Being Tracked</Styled.h3>
			<LoadingIndicator isLoading={isLoading} />
			<SavingIndicator isSaving={isSaving} />
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
		</Box>
	);
}
