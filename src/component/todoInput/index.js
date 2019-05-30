import React, { Component } from 'react';
import './index.scss';

class TodoInput extends Component {

  render() {
    return (

        <input
          className="todo-createTodo-input input-default"
          type="text"
          placeholder="輸入待辦事項"
          value={this.props.inputText}
          onChange={this.props.updateInputText}
          onKeyDown={this.props.keyDown}
          />
    )
  }
}

export default TodoInput;