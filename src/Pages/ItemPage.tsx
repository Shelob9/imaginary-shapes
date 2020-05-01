import React from "react";

import { useParams } from "react-router-dom";
import { Edit } from "../TodoItem/Edit";
import { ItemsContext } from "../ItemsContext";
import { Button, Styled } from "theme-ui";
export default function ItemPage() {
	const {
		activeItemId,
		saveItem,
		setActiveItemId,
		getItemById,
		items,
		LoadingIndicator,
		SavingIndicator,
		makeItemDone,
	} = React.useContext(ItemsContext);
	const [clickedDone, setClickedDone] = React.useState(false);
	let { id } = useParams();

	//Set active item ID from URL
	React.useEffect(() => {
		setActiveItemId(id);
	}, [id, setActiveItemId]);

	//Get the active item
	const initialItem = React.useMemo(() => {
		return getItemById(activeItemId);
	}, [activeItemId, items, getItemById]);

	return (
		<React.Fragment>
			<LoadingIndicator />
			<SavingIndicator />
			{initialItem ? (
				<React.Fragment>
					{!initialItem.done ? (
						<React.Fragment>
							<Button
								onClick={() => {
									if (clickedDone) {
										makeItemDone(getItemById(id));
									} else {
										setClickedDone(true);
									}
								}}
							>
								{clickedDone ? "Confirm" : "Completed?"}
							</Button>
							<Edit
								onSave={saveItem}
								titleText={`Edit ${initialItem.title}`}
								initialItem={initialItem}
								submitText={"Update"}
								activeItemId={activeItemId}
							/>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Styled.h3>{initialItem.title}</Styled.h3>
							<Styled.p>Completed :)</Styled.p>
						</React.Fragment>
					)}
				</React.Fragment>
			) : (
				<div>Not Found</div>
			)}
		</React.Fragment>
	);
}
