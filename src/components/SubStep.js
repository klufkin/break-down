import React from 'react';

const SubStep = ({ index, stepValue, todoKey, removeStep, addStep, editStep }) => {
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

  return (
    <li className="todo-step">
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
    </li>
  );
};

export default SubStep;
