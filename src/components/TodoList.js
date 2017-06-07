import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Todo from './Todo';

const TodoList = ({
  todos,
  remove,
  addTodo,
  moveTodo,
  moveStep,
  addStep,
  editTodo,
  removeStep,
  editStep,
  numSteps,
}) => {
  if (numSteps) {
    return (
      <CSSTransitionGroup
        className="todo-list"
        component="ul"
        transitionName="todo"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >
        {todos.map((todo, index) =>
          (<Todo
            todo={todo}
            key={todo.id}
            index={index}
            addTodo={addTodo}
            moveTodo={moveTodo}
            remove={remove}
            editTodo={editTodo}
            addStep={addStep}
            removeStep={removeStep}
            moveStep={moveStep}
            editStep={editStep}
          />),
        )}
      </CSSTransitionGroup>
    );
  }
  return (
    <ul className="todo-list">
      <div className="first-step">
        <h3 className="first-step-text">Create First Step</h3>
        <button className="first-step-btn" onClick={() => addTodo('')}>
          +
        </button>
      </div>
    </ul>
  );
};

export default TodoList;
