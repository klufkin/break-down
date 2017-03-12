import React from "react";

const SubStep = ({
    index,
    stepValue,
    todoKey,
    removeStep,
    addStep,
    editStep
}) => {
    function handleChange(event, stepKey) {
        editStep(todoKey, stepKey, event.target.value);
    }

    function hitEnter(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            addStep(todoKey);
        }
    }

    function loseFocus(event, key) {
        // If value does not exist remove step.
        if (!event.target.value)
            removeStep(todoKey, key);
    }
    return (
        <li key={index} className="todo-step">
            <div className="step-bullet"></div>

            <div className="expandingTextArea">
                <div className="dummy-container">
                    <span>
                        {stepValue}
                    </span><br/>
                </div>
                <textarea autoFocus spellCheck="false" value={stepValue}
                    onChange={(event) => handleChange(event, index)}
                    onBlur={(event) => loseFocus(event, index)}
                    onKeyDown={(event) => hitEnter(event)}>
                >
                </textarea>
            </div>

            <button className="remove-sub-step-btn"  onClick={() => removeStep(todoKey, index)}>&times;</button>
        </li>
    );
}

export default SubStep;
