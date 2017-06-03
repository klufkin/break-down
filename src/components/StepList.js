import React from "react";
import SubStep from "./SubStep";
import CSSTransitionGroup from "react-addons-css-transition-group";

const StepList = ({ steps, todoKey, removeStep, addStep, editStep }) => {
    return (
        <CSSTransitionGroup
            className="step-list"
            component="ul"
            transitionName="substep"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}>
            {steps.map((step, index) =>
                <SubStep
                    key={step.id}
                    index={index}
                    stepValue={step.text}
                    todoKey={todoKey}
                    addStep={addStep}
                    editStep={editStep}
                    removeStep={removeStep}
                />
            )}
        </CSSTransitionGroup>
    );
};

export default StepList;
