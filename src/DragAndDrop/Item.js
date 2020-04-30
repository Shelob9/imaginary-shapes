import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default class Item extends React.Component {
  render() {
    const isDragDisabled = this.props.task.id === 'task-1'
    return (
      <Draggable
        draggableId={this.props.task.id}
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
            {this.props.task.content}
          </div>
        )}
      </Draggable>
    )
  }
}
