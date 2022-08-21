import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCircleCheck, faPen, faTrashCan
 } from "@fortawesome/free-solid-svg-icons";
 import './App.css';




const App = () => {
  const [todos, setTodos] = useState([
    {"id": 1, "title": "Task 1", "completed": false},
    {"id": 2, "title": "Task 2", "completed": false},
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [updateData, setUpdateData] = useState('');

  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, {"id": todos.length + 1, "title": newTodo, "completed": false}]);
      setNewTodo('');
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const updateTodo = () => {
    let filterRecords = [...todos].filter(task => task.id !== updateData.id);
    let updateRecord = [...filterRecords, updateData];
    setTodos(updateRecord);
    setUpdateData('');
    console.log(updateRecord);
  }

  const completeTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }));
  }

  const changeTask = (e) => {
    let newTask = {
      "id": updateData.id,
      "title": e.target.value,
      "completed": updateData.completed ? true : false
    };
    setUpdateData(newTask.title);
  }
 
  return (
    <div className="container App">
      <h1>Todo List</h1>

      {/* Update Task */}
      <div className="row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Update Task" onChange={(e) => changeTask(e)} value={updateData && updateData.title} />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary mx-3" onClick={updateTodo}>Update</button>
            <button className="btn btn-warning" onClick={() => setUpdateData('')}>Cancel</button>
            </div>
      </div>
      <br />

      {/* Add Task */}
      <div className="row">
        <div className="col">
          <input type="text" className="form-control" placeholder="New Todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={addTodo}>Add Task</button>
        </div>
      </div>
      <br />

      {todos && todos.length ? '' : 'No todos yet'}

      {todos && todos
      .sort((a, b) => a.id > b.id ? 1 : -1)
      .map((task, index) => {
        return (
          <div key={task.id}>
            <div className="col bg-task">
              <div className={ task.completed ? 'done' : '' }>
                <div className="task-number">{index + 1}</div>
                <div className="taskText">{task.title}</div>  
              </div>
              <div className="task-buttons">
                <span title="Completed / Not Completed" onClick={() => completeTodo(task.id)}>
                  <FontAwesomeIcon icon={faCircleCheck}/>
                </span>

                {task.completed ? null : 
                <span title="Edit Task" onClick={() => setUpdateData({
                  "id": task.id,
                  "title": task.title,
                  "completed": task.completed ? true : false
                })}>
                  <FontAwesomeIcon icon={faPen}/>
                </span>}


                <span title="Delete" 
                onClick={() => deleteTodo(task.id)}>
                  <FontAwesomeIcon icon={faTrashCan}/>
                </span>
                </div>
            </div>
          </div>
  )})}
  </div>
  );
}


export default App;