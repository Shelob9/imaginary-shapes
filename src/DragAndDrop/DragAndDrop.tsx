import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import DragAndDropColumn from "./DragAndDropColumn";
import { dragAndDropState } from "./types";

class DragAndDrop extends React.Component<
	{
		initialData: dragAndDropState;
		//Optionally call a function to modify state before updating
		stateMiddleWare?: (update: dragAndDropState) => dragAndDropState;
	},
	dragAndDropState
> {
	constructor(props) {
		super(props);
		this.state = props.initialData;
	}

	//IMPORTANT: ALWAYS use this to set state
	updateState = (update: dragAndDropState) => {
		if (this.props.stateMiddleWare) {
			this.setState(this.props.stateMiddleWare(update));
		} else {
			this.setState(update);
		}
	};

	onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const start = this.state.columns[source.droppableId];
		const finish = this.state.columns[destination.droppableId];

		if (start === finish) {
			const newitemIds = Array.from(start.itemIds);
			newitemIds.splice(source.index, 1);
			newitemIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				itemIds: newitemIds,
			};

			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newColumn.id]: newColumn,
				},
			};

			this.updateState(newState);
			return;
		}

		// Moving from one list to another
		const startitemIds = Array.from(start.itemIds);
		startitemIds.splice(source.index, 1);
		const newStart = {
			...start,
			itemIds: startitemIds,
		};

		const finishitemIds = Array.from(finish.itemIds);
		finishitemIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			itemIds: finishitemIds,
		};

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};
		this.updateState(newState);
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<div>
					{this.state.columnOrder.map((columnId) => {
						const column = this.state.columns[columnId];
						const items = column.itemIds.map(
							(itemId) => this.state.items[itemId]
						);

						return (
							<DragAndDropColumn
								key={column.id}
								column={column}
								items={items}
							/>
						);
					})}
				</div>
			</DragDropContext>
		);
	}
}

export default DragAndDrop;
