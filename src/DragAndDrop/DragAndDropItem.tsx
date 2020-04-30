import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { dragAndDropItem } from "./types";
import { ItemsContext } from "../ItemsContext";
import { SavedItem } from "../sorter/types";
import SingleItem from "../TodoItem/SingleItem";

export default class DragAndDropItem extends React.Component<{
	item: dragAndDropItem;
	index: number;
	render?: (props: { item: SavedItem }) => Element;
}> {
	static contextType = ItemsContext;
	render() {
		const item = this.context.getItemById(this.props.item.id);
		const isDragDisabled = false;
		return (
			<Draggable
				draggableId={this.props.item.id}
				index={this.props.index}
				isDragDisabled={isDragDisabled}
			>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						innerRef={provided.innerRef}
						isDragging={snapshot.isDragging}
						isDragDisabled={isDragDisabled}
					>
						{item ? (
							<SingleItem item={item} lock={snapshot.isDragging} />
						) : (
							<p>{this.props.item.content}</p>
						)}
					</div>
				)}
			</Draggable>
		);
	}
}
