import React, { Component } from 'react';
import './index.scss';


class CreateTodoBtn extends Component {

  render() {
    return (
      <button className="todo-createTodo-addbtn btn secondary-btn" onClick={this.props.createTodo}>新增</button>
    )
  }
}

export default CreateTodoBtn;