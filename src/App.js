import React, { Component } from 'react';
import './App.scss';
import Title from './component/title';
import CreateTodo from './component/createTodo';
import TodoList from './component/todoList';
import { async } from 'q';



class App extends Component {
  constructor(props) {
    super(props)

    // let todos = [
    //   { id: 0, text: 'eat', isEdited: false, isChecked: false }
    // ]
    this.state = {
      todos: [],
      startId: 1
    }
  }

  createTodo = async (text) => {
    await fetch('http://localhost:5000/api/addTodo', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        isChecked: false,
        isEdited: false
      })
    })
      .then(response => response.json())

    this.setState({
      todos: [...this.state.todos, { id: this.state.startId, text: text, isEdited: false, isChecked: false }],
      startId: this.state.startId + 1
    })
  }

  editTodo(id) {

    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.isEdited = true;
      }
      return todo;
    });
    this.setState({ todos });
  }

  removeTodo = async (id) => {
    await fetch('http://localhost:5000/api/Delete', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id
      })
    })


      .then(response => response.json())


    this.setState({
      todos: this.state.todos.filter(todo => {
        return todo.id !== id
      })
    })
  }

  updateTodo(id, text) {

    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    this.setState({ todos });
  }

  saveEdit(event, id, text) {



    const todos = this.state.todos.map(todo => {
      if (todo.id === id && event.charCode === 13) {
        fetch('http://localhost:5000/api/Edit', {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            text: text,
            isEdited: false,
            isChecked: false
          })
        })
          .then(response => response.json())
        todo.isEdited = false
      }
      return todo;
    });
    this.setState({ todos });
  }


  completeTodo(id) {
   
    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {          
        // console.log(todo.isChecked)
        todo.isChecked = !todo.isChecked

        fetch('http://localhost:5000/api/Edit', {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            isChecked: todo.isChecked
          })
        })
        
          .then(response => response.json())
          console.log(todo.isChecked)
      }
      return todo;
    });
    this.setState({ todos });
  }

  componentDidMount = async () => {
    await fetch('http://localhost:5000/api/getAllTodos', {
      method: "GET",
      mode: "cors"
    })
      .then(response => response.json())
      .then(data => this.setState({ todos: data.data }))
    // console.log(this.state.todos)
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
          saveEdit={(event, id, text) => this.saveEdit(event, id, text)}
          removeTodo={(id) => this.removeTodo(id)}
        />
      </div>

    )
  }
}

export default App;
