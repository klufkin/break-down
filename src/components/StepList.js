import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import SubStep from './SubStep';

const StepList = ({ steps, todoIndex, todoID, removeStep, addStep, editStep, moveStep }) =>
  (<CSSTransitionGroup
    className="step-list"
    component="ul"
    transitionName="substep"
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}
  >
    {steps.map((step, index) =>
      (<SubStep
        key={step.id}
        id={step.id}
        index={index}
        stepValue={step.text}
        todoIndex={todoIndex}
        todoID={todoID}
        addStep={addStep}
        editStep={editStep}
        removeStep={removeStep}
        moveStep={moveStep}
      />),
    )}
  </CSSTransitionGroup>);

export default StepList;
