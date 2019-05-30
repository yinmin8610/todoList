import React, { Component } from 'react';
import './App.scss';
import Title from './component/title';
import CreateTodo from './component/createTodo';
import TodoList from './component/todoList';



class App extends Component {
  constructor(props) {
    super(props)

    let todos = [
      { id: 0, text: 'eat', isEdited: false, isChecked: false }
    ]
    this.state = {
      todos: todos,
      startId: 1
    }
  }

  createTodo(text) {
    this.setState({
      todos: [...this.state.todos, { id: this.state.startId, text: text, isEdited: false, isChecked: false }],
      startId: this.state.startId + 1
    })
  }

  editTodo(id) {

    // const todos = this.state.todos;
    // for (let i = 0; i < todos.length; i++) {
    //   if (i === id) {
    //     // console.log('!!', id)
    //     todos[i].isEdited = true
    //     this.setState({ todos })
    //   }
    // }

    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.isEdited = true;
      }
      return todo;
    });
    this.setState({ todos });
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => {
        return todo.id !== id
      })
    })
  }

  updateTodo(id, text) {

    // const todos = this.state.todos;
    // for (let i = 0; i < todos.length; i++) {
    //   if (i === id) {
    //     todos[i].text = text;
    //     this.setState({ todos });
    //   }
    // }
    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    this.setState({ todos });
  }

  saveEdit(event, id) {

    // const todos = this.state.todos;
    // for (let i = 0; i < todos.length; i++) {
    //   if (i === id && event.charCode === 13) {
    //     todos[i].isEdited = false
    //     this.setState({ todos })

    //   }
    // }
    const todos = this.state.todos.map(todo => {
      if (todo.id === id && event.charCode === 13) {
        todo.isEdited = false
      }
      return todo;
    });
    this.setState({ todos });
  }


  completeTodo(id) {

    // const todos = this.state.todos;
    // for (let i = 0; i < todos.length; i++) {
    //   if (i === id) {
    //     console.log('!!')
    //     todos[i].isChecked = !this.state.todos[i].isChecked
    //     this.setState({ todos })
    //   }
    // }
    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        // console.log(todo.isChecked)
        todo.isChecked = !todo.isChecked
      }
      return todo;
    });
    this.setState({ todos });
  }

  render() {
    return (
      <div className="todo">
        <Title />
        <CreateTodo
          todos={this.state.todos}
          createTodo={text => this.createTodo(text)}
        />

        <TodoList
          todos={this.state.todos}
          completeTodo={(id) => this.completeTodo(id)}
          updateTodo={(id, text) => this.updateTodo(id, text)}
          editTodo={(id) => this.editTodo(id)}
          saveEdit={(event, id) => this.saveEdit(event, id)}
          removeTodo={(id) => this.removeTodo(id)}
        />
      </div>

    )
  }
}

export default App;
