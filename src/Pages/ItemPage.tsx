import React from "react";

import { useParams } from "react-router-dom";
import { Edit } from "../TodoItem/Edit";
import { ItemsContext } from "../ItemsContext";
import { Button, Styled, Divider } from "theme-ui";
export default function ItemPage() {
	const {
		activeItemId,
		saveItem,
		setActiveItemId,
		getItemById,
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

	return (
		<React.Fragment>
			<LoadingIndicator />
			<SavingIndicator />
			{initialItem ? (
				<React.Fragment>
					{!initialItem.done ? (
						<React.Fragment>
							<Edit
								onSave={saveItem}
								titleText={`Edit ${initialItem.title}`}
								initialItem={initialItem}
								submitText={"Update"}
								activeItemId={activeItemId}
							/>
							<Divider />
							<Button
								sx={{ width: "100%", marginTop: 40 }}
								onClick={() => saveItem({ ...getItemById(id), done: true })}
							>
								Mark Completed
							</Button>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Styled.h3>{initialItem.title}</Styled.h3>
							<Styled.p>Completed :)</Styled.p>
							<Button
								sx={{ width: "100%" }}
								onClick={() => saveItem({ ...getItemById(id), done: false })}
							>
								Mark Uncompleted
							</Button>
						</React.Fragment>
					)}
				</React.Fragment>
			) : (
				<div>Not Found</div>
			)}
		</React.Fragment>
	);
}
