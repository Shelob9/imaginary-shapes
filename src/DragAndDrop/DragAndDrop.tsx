import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import DragAndDropColumn from "./DragAndDropColumn";
import { dragAndDropState } from "./types";
import { Grid, Styled, Box } from "theme-ui";

type columnId = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
const Column = (props: { state: dragAndDropState; columnId: columnId }) => {
	const column = props.state.columns[props.columnId];
	const items = column.itemIds.map((itemId) => props.state.items[itemId]);

	return <DragAndDropColumn key={column.id} column={column} items={items} />;
};

export type location = { droppableId: columnId; index: number };
export type locationChange = {
	previousQuadrant: location;
	newQuadrant: location;
	itemId: string;
};
class DragAndDrop extends React.Component<
	{
		initialData: dragAndDropState;
		//Optionally call a function to modify state before updating
		stateMiddleWare?: (
			update: dragAndDropState,
			locationChange: locationChange
		) => dragAndDropState;
		ColumnOne?: (props: { children: any }) => Element;
	},
	dragAndDropState
> {
	constructor(props) {
		super(props);
		this.state = props.initialData;
	}

	//IMPORTANT: ALWAYS use this to set state
	updateState = (update: dragAndDropState, locationChange: locationChange) => {
		if (this.props.stateMiddleWare) {
			this.setState(this.props.stateMiddleWare(update, locationChange));
		} else {
			this.setState(update);
		}
	};

	onDragEnd = (result: {
		destination?: location;
		source?: location;
		draggableId: string;
	}) => {
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

		const lChange: locationChange = {
			previousQuadrant: source,
			newQuadrant: destination,
			itemId: draggableId,
		};

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

			this.updateState(newState, lChange);
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
		this.updateState(newState, lChange);
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Grid gap={2} columns={[2]}>
					<Grid>
						<Box p={2}>
							<Styled.h3>Urgent & Important</Styled.h3>
							<Column columnId={"topLeft"} state={this.state} />
						</Box>
						<Box p={2}>
							<Styled.h3>Important, Not Urgent</Styled.h3>
							<Column columnId={"topRight"} state={this.state} />
						</Box>
					</Grid>
					<Grid>
						<Box p={2}>
							<Styled.h3>Urgent, not important</Styled.h3>
							<Column columnId={"bottomLeft"} state={this.state} />
						</Box>
						<Box p={2}>
							<Styled.h3>Not urgent or important</Styled.h3>
							<Column columnId={"bottomRight"} state={this.state} />
						</Box>
					</Grid>
				</Grid>
			</DragDropContext>
		);
	}
}

export default DragAndDrop;
