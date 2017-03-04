import React from "react";

const StepList = ({steps, todoKey, removeStep, addStep, editStep}) => {

    function handleChange(event, stepKey){
        editStep(todoKey, stepKey, event.target.value);
    }

    function hitEnter(event){
        if(event.keyCode === 13) {
            event.preventDefault();
            addStep(todoKey);
        }
    }

    function loseFocus(event, key){
        // If value does not exist remove step.
        if(!event.target.value)
            removeStep(todoKey, key);
    }

    return (
        <ul className="step-list">
            {Object
                .keys(steps)
                .map((key) =>
                    <li key={key} className="todo-step">
                        <div className="step-bullet"></div>

                        <div className="expandingTextArea">
                            <div className="dummy-container">
                                <span>
                                    {steps[key].text}
                                </span><br/>
                            </div>
                            <textarea autoFocus spellCheck="false" value={steps[key].text}
                                onChange={(event) => handleChange(event, key)}
                                onBlur={(event) => loseFocus(event, key)}
                                onKeyDown={(event) => hitEnter(event)}>
                            >
                            </textarea>
                        </div>

                        <button  onClick={() => removeStep(todoKey, key)}>&times;</button>
                    </li>
                )
            }
        </ul>
    );
}

export default StepList;
