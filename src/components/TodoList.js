import React from "react";
import Todo from "./Todo";
import CSSTransitionGroup from "react-addons-css-transition-group";


const TodoList = ({todos, remove, addTodo, addStep, editTodo, removeStep, editStep, numSteps}) => {
    if(numSteps){
        return (
            <CSSTransitionGroup
			 className="todo-list"
			 component="ul"
			 transitionName="todo"
			 transitionEnterTimeout={200}
			 transitionLeaveTimeout={200}
			 >
                {Object.keys(todos).map( key =>
                    <Todo
                        todo={todos[key]}
                        key={key}
                        index={key}
                        addTodo={addTodo}
                        remove={remove}
                        editTodo={editTodo}
                        addStep={addStep}
                        removeStep={removeStep}
                        editStep={editStep}
                    />
                )}
            </CSSTransitionGroup>
        );
    }
    else {
        return (
            <ul className="todo-list">
                <div className="first-step">
                    <h3 className="first-step-text">Create First Step</h3>
                    <button className="first-step-btn" onClick={() => addTodo("")}>+</button>
                </div>
            </ul>
        )
    }
}

export default TodoList;
