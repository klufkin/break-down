import React from 'react';

const TodoForm = ({ addTodo, numSteps }) => {
  if (numSteps) {
    return (
      <button type="submit" className="add-step-button" onClick={() => addTodo('')}>
        +
      </button>
    );
  }
  return <span />;
};

export default TodoForm;
