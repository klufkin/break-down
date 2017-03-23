import React, { Component } from 'react';
import TodoApp from "./components/TodoApp";
import About from "./components/About";

class App extends Component {
  render() {
    return (
      <div className="App">
        <About/>
        <TodoApp/>
      </div>
    );
  }
}

export default App;
