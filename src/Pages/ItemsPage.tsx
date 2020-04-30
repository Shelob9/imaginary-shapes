import React from "react";
import { useHistory } from "react-router-dom";
import { SavedItem } from "../sorter/types";
import { Box, Button } from "theme-ui";
import { ItemsContext } from "../ItemsContext";
import SortedItems from "../SortedItems";

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
		saveItems,
	} = React.useContext(ItemsContext);
	const history = useHistory();

	React.useEffect(() => {
		if (activeItemId && "string" === typeof activeItemId) {
			history.push(`/items/${activeItemId}`);
		} else {
			history.push(`/items`);
		}
	}, [activeItemId, history]);

	if (activeItem) {
		return <div>{activeItem.id}</div>;
	}
	return (
		<Box>
			<LoadingIndicator />
			<SavingIndicator />
			{!isSaving && !isLoading && <Button onClick={saveItems}>Save</Button>}
			{hasChanged ? <div>Has changed</div> : <div>Has not changed</div>}
			<SortedItems lock={isSaving || isLoading} />
		</Box>
	);
}
