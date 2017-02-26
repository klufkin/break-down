import React from "react";

const StepList = ({steps, todoKey, setStep, removeStep, addStep, editStep}) => {
    let input;

    function handleChange(event, stepKey){
        editStep(todoKey, stepKey, event.target.value);
    }

    function hitEnter(event){
        if(event.keyCode === 13)
            addStep(todoKey);
    }

    function loseFocus(event, key){
        // If value exists set, else remove step.
        if(event.target.value){
            setStep(todoKey, key, false)
        }
        else {
            removeStep(todoKey, key);
        }
    }

    return (
        <ul className="step-list">
            {Object
                .keys(steps)
                .map((key) => {
                    if(steps[key].edit){
                        return (
                            <li key={key} className="todo-step">
                                <input autoFocus type="text" placeholder="new step" value={steps[key].text}
                                    ref={ (inputNode) => { input = inputNode; } }
                                    onBlur={(event) => loseFocus(event, key)}
                                    onKeyUp={(event) => hitEnter(event)}
                                    onChange={(event) =>handleChange(event, key)}/>
                                <button  onClick={() => removeStep(todoKey, key)}>&times;</button>
                            </li>
                        );
                    } else {
                        return (
                            <li key={key} className="todo-step">
                                <span  onClick={() => setStep(todoKey, key, true)}>{steps[key].text}</span>
                                <button  onClick={() => removeStep(todoKey, key)}>&times;</button>
                            </li>
                        );
                    }
                })
            }
        </ul>
    );
}

export default StepList;
