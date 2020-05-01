import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "theme-ui";
import { ItemsContext } from "../ItemsContext";
import SortedItems from "../SortedItems";

export default function ItemsPage() {
	const {
		activeItem,
		isLoading,
		isSaving,
		activeItemId,
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
			<SortedItems lock={isSaving || isLoading} />
		</Box>
	);
}
