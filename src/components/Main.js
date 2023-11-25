import React, { Component } from 'react';
import Form from './Form';
import Tasks from './Tasks';
import './Main.scss';

export default class Main extends Component {
  state = {
    newTask: '',
    taskList: [],
    index: -1,
  };

  // Será executado uma única vez quando o componente for montado
  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!tasks) return;

    this.setState({ taskList: tasks });
  }

  // prevProps representa as props anteriores à mudança
  // prevState recupera o estado anterior de um componente antes da atualização
  componentDidUpdate(prevProps, prevState) {
    const { taskList } = this.state;
    if (taskList === prevState.taskList) return;

    localStorage.setItem('tasks', JSON.stringify(taskList));
  }

  handleInputChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { taskList, index } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    // Se o texto não for válido ou se já existe
    if (!newTask || taskList.indexOf(newTask) !== -1) return;

    const newTaskList = [...taskList];

    if (index === -1) {
      this.setState({
        taskList: [...taskList, newTask],
        newTask: '',
      });
    } else {
      newTaskList[index] = newTask;
      this.setState({
        taskList: [...newTaskList],
        newTask: '',
        index: -1,
      });
    }
  };

  handleDelete = (e, index) => {
    const { taskList } = this.state;
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    this.setState({ taskList: [...newTaskList] });
  };

  handleEdit = (e, index) => {
    const { taskList } = this.state;
    this.setState({ index, newTask: taskList[index] });
  };

  render() {
    const { newTask, taskList } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          newTask={newTask}
        />

        <Tasks taskList={taskList} handleEdit={this.handleEdit} handleDelete={this.handleDelete}/>

      </div>
    );
  }
}
