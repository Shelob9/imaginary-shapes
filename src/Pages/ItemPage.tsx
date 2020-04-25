import React from "react";
import { UserSession } from "blockstack";
import useBlockStackSavedItems from "../useBlockStackSavedItems";
import { useParams } from "react-router-dom";
import { Edit } from "../TodoItem/Edit";

const LoadingIndicator = (props: { isLoading: boolean }) =>
	props.isLoading ? <div>Loading Spinner</div> : null;
const SavingIndicator = (props: { isSaving: boolean }) =>
	props.isSaving ? <div>Saving Spinner</div> : null;

export default function ItemPage(props: { userSession: UserSession }) {
	const {
		activeItem,
		saveItem,
		setActiveItemId,
		isLoading,
		isSaving,
	} = useBlockStackSavedItems(props.userSession);
	let { id } = useParams();

	React.useEffect(() => {
		setActiveItemId(id);
	}, [id]);

	return (
		<React.Fragment>
			<LoadingIndicator isLoading={isLoading} />
			<SavingIndicator isSaving={isSaving} />
			{activeItem ? (
				<Edit
					onSave={saveItem}
					titleText={activeItem.title}
					initialItem={activeItem}
					submitText={"Update"}
				/>
			) : null}
		</React.Fragment>
	);
}
