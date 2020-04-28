import React from "react";

import { useParams } from "react-router-dom";
import { Edit } from "../TodoItem/Edit";
import { ItemsContext } from "../ItemsContext";

export default function ItemPage() {
	const {
		activeItemId,
		saveItem,
		setActiveItemId,
		getItemById,
		isLoading,
		isSaving,
		items,
		LoadingIndicator,
		SavingIndicator,
	} = React.useContext(ItemsContext);
	let { id } = useParams();

	//Set active item ID from URL
	React.useEffect(() => {
		setActiveItemId(id);
	}, [id, setActiveItemId]);

	//Get the active item
	const initialItem = React.useMemo(() => {
		return getItemById(activeItemId);
	}, [activeItemId, items, getItemById]);

	return React.useMemo(
		() => (
			<React.Fragment>
				<LoadingIndicator isLoading={isLoading} />
				<SavingIndicator isSaving={isSaving} />
				{initialItem ? (
					<React.Fragment>
						<Edit
							onSave={saveItem}
							titleText={`Edit ${initialItem.title}`}
							initialItem={initialItem}
							submitText={"Update"}
							activeItemId={activeItemId}
						/>
					</React.Fragment>
				) : (
					<div>Not Found</div>
				)}
			</React.Fragment>
		),
		[activeItemId, items]
	);
}
