import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      description: '',
      todos: [],
      showIncomplete: false,
      hoverIndex: null,
      editingIndex: null,
    };
  }

  handleChangeTodo = (e) => {
    this.setState({ todo: e.target.value });
  };

  handleChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  handleAddTodo = () => {
    const trimmedTodo = this.state.todo.trim();

    if (this.state.todo !== trimmedTodo) {
      alert('Пожалуйста, уберите лишние пробелы в начале и конце названия задачи.');
      return;
    }

    if (trimmedTodo === '') {
      alert('Введите название задачи');
      return; 
    }

    const newTodo = { 
      text: trimmedTodo,
      description: this.state.description,
      completed: false,
      time: new Date().toLocaleString()
    };
    
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
      todo: '',
      description: '',
    }));
  };

  toggleTodoCompletion = (index) => {
    this.setState((prevState) => {
      const todos = prevState.todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed }; 
        }
        return todo;
      });
      return { todos };
    });
  };

  toggleShowIncomplete = () => {
    this.setState((prevState) => ({ showIncomplete: !prevState.showIncomplete }));
  };

  handleDeleteTodo = (index) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((_, i) => i !== index),
    }));
  };

  handleEditTodo = (index) => {
    const todoToEdit = this.state.todos[index];
    this.setState({
      todo: todoToEdit.text,
      description: todoToEdit.description,
      editingIndex: index,
    });
  };

  handleUpdateTodo = () => {
    const { editingIndex, todo, description } = this.state;
    const trimmedTodo = todo.trim();

    if (todo !== trimmedTodo) {
      alert('Пожалуйста, уберите лишние пробелы в начале и конце названия задачи.');
      return;
    }

    if (editingIndex !== null && trimmedTodo !== '') {
      const updatedTodos = this.state.todos.map((todoItem, index) => {
        if (index === editingIndex) {
          return { ...todoItem, text: trimmedTodo, description: description };
        }
        return todoItem;
      });

      this.setState({
        todos: updatedTodos,
        todo: '',
        description: '',
        editingIndex: null,
      });
    } else if (trimmedTodo === '') {
      alert('Введите название задачи');
    }
  };

  render() {
    const filteredTodos = this.state.showIncomplete
      ? this.state.todos.filter(todo => !todo.completed)
      : this.state.todos;

    const sortedTodos = filteredTodos.sort((a, b) => a.completed - b.completed);

    return (
      <>
        <h1>TODO LIST</h1>

        <input
          type="text"
          value={this.state.todo}
          onChange={this.handleChangeTodo}
          placeholder="Введите задачу"
        />
        <textarea
          value={this.state.description}
          onChange={this.handleChangeDescription}
          placeholder="Введите описание"
        />
        {this.state.editingIndex !== null ? (
          <button onClick={this.handleUpdateTodo} className="button button-update">
            Обновить
          </button>
        ) : (
          <button onClick={this.handleAddTodo} className="button button-add">
            Добавить
          </button>
        )}
        <button onClick={this.toggleShowIncomplete} className="fixed-button">
          {this.state.showIncomplete ? 'Показать все' : 'Показать только невыполненные'}
        </button>

        <ul>
          {sortedTodos.map((todo, index) => (
            <li 
              key={index}
              onMouseEnter={() => this.setState({ hoverIndex: index })}
              onMouseLeave={() => this.setState({ hoverIndex: null })}
            >
              <label className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.toggleTodoCompletion(index)}
                />
                <span className="todo-text" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text} <em className="todo-time">{todo.time}</em>
                </span>
                <div className="todo-description">{todo.description}</div>
                <button 
                  onClick={() => this.handleEditTodo(index)} 
                  className="edit-button"
                >
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/259/259450.png" 
                    alt="edit"
                  />
                </button>
                {this.state.hoverIndex === index && (
                  <button 
                    onClick={() => this.handleDeleteTodo(index)} 
                    className="delete-button"
                  >
                    Удалить
                  </button>
                )}
              </label>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default App;