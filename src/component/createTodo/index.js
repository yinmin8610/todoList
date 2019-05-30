import React, { Component } from 'react';
import './index.scss';
import TodoInput from '../todoInput';
import CreateTodoBtn from '../CreateTodoBtn';

class CreateTodo extends Component {

	constructor(props) {
		super(props)
		this.state = {
			inputText: ''
		}

	}

	createTodo() {
		if (this.state.inputText) {
			this.props.createTodo(this.state.inputText);

			this.setState({ inputText: '' })
		}
	}
	updateInputText(e) {
		this.setState({ inputText: e.target.value })
	}
	keyDown(e){
		if(e.keyCode === 13){
			this.createTodo()
		}
		
	}
	render() {
		return (
			<div className="todo-createTodo">
				<TodoInput
					inputText={this.state.inputText}
					updateInputText={(e) => this.updateInputText(e)}
					keyDown={(e) => this.keyDown(e)}/>
				<CreateTodoBtn
					createTodo={() => this.createTodo()} />
			</div>
		)
	}
}


export default CreateTodo;