import React from "react";
import SubStep from "./SubStep";
import CSSTransitionGroup from "react-addons-css-transition-group";

const StepList = ({steps, todoKey, removeStep, addStep, editStep}) => {

    return (
            <CSSTransitionGroup
			 className="step-list"
			 component="ul"
			 transitionName="substep"
			 transitionEnterTimeout={200}
			 transitionLeaveTimeout={200}
			 >
                {Object
                    .keys(steps)
                    .map((key) =>
                    <SubStep
                        key={key}
                        index={key}
                        stepValue={steps[key].text}
                        todoKey={todoKey}
                        addStep={addStep}
                        editStep={editStep}
                        removeStep={removeStep}
                    />
                    )
                }
            </CSSTransitionGroup>
    );
}

export default StepList;
