import React, { Component } from 'react';
import './index.scss';


class TodoList extends Component {

  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map((todo) => {
          return (
            todo.isEdited ? (
              <input
                className="input-default"
                type="text" value={todo.text}
                key={todo.id}
                onChange={(e) => this.props.updateTodo(todo.id, e.target.value)}
                onKeyPress={(event) => this.props.saveEdit(event, todo.id)}
              />

            ) : (
                <li key={todo.id} className={'todo-list-item input-default ' + (todo.isChecked ? "todo-list-complete" : "")}>
                  <input type="checkbox" className="todo-list-check" onClick={() => this.props.completeTodo(todo.id)} />
                  <span className="todo-list-text">{todo.text}</span>
                  <input type="button" className="todo-list-edit btn info-btn" value="編輯" onClick={() => this.props.editTodo(todo.id)} />
                  <input type="button" className="todo-list-remove btn danger-btn" value="刪除" onClick={() => this.props.removeTodo(todo.id)} />
                </li>
              )

          )
        })}

      </ul>
    )
  }
}


export default TodoList;
