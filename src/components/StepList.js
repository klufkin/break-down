import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import SubStep from './SubStep';

const StepList = ({ steps, todoKey, removeStep, addStep, editStep, moveStep }) =>
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
        todoKey={todoKey}
        addStep={addStep}
        editStep={editStep}
        removeStep={removeStep}
        moveStep={moveStep}
      />),
    )}
  </CSSTransitionGroup>);

export default StepList;
