import React from "react";
import { useHistory } from "react-router-dom";
import { SavedItem } from "../sorter/types";
import { Box } from "theme-ui";
import { ItemsContext } from "../ItemsContext";
import SortedItems, { useQuadrants } from "../SortedItems";

export default function ItemsPage() {
	const {
		addItem,
		activeItem,
		saveNewItem,
		isLoading,
		isSaving,
		activeItemId,
		hasChanged,
		LoadingIndicator,
		SavingIndicator,
	} = React.useContext(ItemsContext);
	const history = useHistory();

	const onSave = (item: SavedItem) => {
		saveNewItem(item).then(() => {
			addItem(item);
			history.push(`/items/${item.id}`);
		});
	};

	const {
		topLeft, //Urgent and important
		topRight, //Important not urgent
		bottomLeft, //Urgent, not important
		bottomRight, //Not urgent or important
		asDndState,
	} = useQuadrants();

	React.useEffect(() => {
		if (activeItemId) {
			history.push(`/items/${activeItemId}`);
		} else {
			history.push(`/items`);
		}
	}, [activeItemId, history]);

	if (activeItem) {
		return <div>{activeItem.id}</div>;
	}
	console.log(asDndState());
	return (
		<Box>
			<LoadingIndicator isLoading={isLoading} />
			<SavingIndicator isSaving={isSaving} />
			{hasChanged ? <div>Has changed</div> : <div>Has not changed</div>}
			<SortedItems lock={isSaving || isLoading} />
		</Box>
	);
}
