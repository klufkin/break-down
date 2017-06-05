import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';

// React DnD - drag source: indicates functionality of draggable step and what data will be passed to identify them
const subStepSource = {
  beginDrag(props) {
    // returned properties will be passed to monitored item (shows up in monitor in hover())
    return {
      id: props.id,
      index: props.index,
    };
  },
  // prevent move form occurring if drop happens outside of list.
  endDrag(props, monitor) {
    const { id: droppedId, index } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveStep(props.todoKey, droppedId, index);
    }
  },
};

// indicates what info will be passed as props to the specified component
// connect - defines the role the wrapped component will play
// monitor - allows you to update a components props based on its drag/drop state
function sourceCollect(connect, monitor) {
  // What's returned will be passed as props to the wrapped component
  return {
    connectDragSource: connect.dragSource(), // turns wrapped root intro draggable component
    isDragging: monitor.isDragging(), // boolean to indicate whether or not dragging source
  };
}

const subStepTarget = {
  hover(props, monitor) {
    const { id: dragID } = monitor.getItem();
    const { id: hoverID, index: hoverIndex, todoKey: todoIndex } = props;

    // Don't replace items with themselves (don't use index as this changes as step moves)
    if (dragID !== hoverID) {
      props.moveStep(todoIndex, dragID, hoverIndex);
    }
  },
};

function targetCollect(connect) {
  // What's returned will be passed as props to the wrapped drop target component
  return {
    connectDropTarget: connect.dropTarget(), // wrap around component root to make it a drop target
  };
}

const SubStep = ({
  index,
  id,
  stepValue,
  todoKey,
  removeStep,
  addStep,
  editStep,
  moveStep,
  isDragging,
  connectDragSource,
  connectDropTarget,
}) => {
  function handleChange(event) {
    editStep(todoKey, index, event.target.value);
  }

  // If user hits enter add a substep
  function hitEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      addStep(todoKey);
    }
  }

  function loseFocus(event) {
    // If value does not exist remove step.
    if (!event.target.value) removeStep(todoKey, index);
  }

  const opacity = isDragging ? 0 : 1;

  return connectDragSource(
    connectDropTarget(
      <li className="todo-step" style={{ opacity }}>
        <div className="step-bullet" />

        <div className="expandingTextArea">
          <div className="dummy-container">
            <span>
              {stepValue}
            </span>
            <br />
          </div>
          <textarea
            autoFocus
            spellCheck="false"
            value={stepValue}
            onChange={event => handleChange(event)}
            onBlur={event => loseFocus(event)}
            onKeyDown={event => hitEnter(event)}
          />
        </div>

        <button className="remove-sub-step-btn" onClick={() => removeStep(todoKey, index)}>
          &times;
        </button>
      </li>,
    ),
  );
};

// higher order components modifying BoardSquare to be a drop target.
// Parameters (1) - will only react to items of said type produced by "dragsource" / "droptarget"
// Parameters (2) - spec: describes how the "drag source" / "drop target" will react to drag and drop events
// Parameters (3) - Provides props to hook up component to DnD back end and check state of drag/drop
export default DragSource(ItemTypes.SUBSTEP, subStepSource, sourceCollect)(
  DropTarget(ItemTypes.SUBSTEP, subStepTarget, targetCollect)(SubStep),
);
