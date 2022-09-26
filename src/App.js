import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCircleCheck, faPen, faTrashCan
 } from "@fortawesome/free-solid-svg-icons";
 import './App.css';




const App = () => {
  // Task state
  const [todos, setTodos] = useState([]);
  // Temporary state for new task input field value 
  const [newTodo, setNewTodo] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Add new task to the list
  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, {id: todos.length + 1, title: newTodo, completed: false}]);
      setNewTodo('');
    }
  }
  // Delete task from the list
  const deleteTodo = (id) => {
    setTodos(todos.filter(task => task.id !== id));
  }
  // Update task from the list
  const updateTodo = () => {
    let filterRecords = [...todos].filter(task => task.id !== updateData.id);
    setTodos([...filterRecords, updateData]);
    setUpdateData('');
  }
  // Mark task as completed or not completed 
  const completeTodo = (id) => {
    setTodos(todos.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    }));
  }
  // Change task for update 
  const changeTask = (e) => {
    let newTask = {
      id: updateData.id,
      title: e.target.value,
      completed: updateData.completed ? true : false
    };
    setUpdateData(newTask);
  }
 
  return (
    <div className="container App">
      <h1>Todo List</h1>

      {/* Update Task */}
      {updateData && updateData ? (
        <>
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

        </>  
      ) : (
        <>
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
        </>
      )}
      
      

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
              {/* Complete Button */}
              <div className="task-buttons">
                <span title="Completed / Not Completed" onClick={() => completeTodo(task.id)}>
                  <FontAwesomeIcon icon={faCircleCheck}/>
                </span>

              {/* Edit Task */}
                {task.completed ? null : 
                <span title="Edit Task" onClick={() => setUpdateData({
                  id: task.id,
                  title: task.title,
                  completed: task.completed ? true : false
                })}>
                  <FontAwesomeIcon icon={faPen}/>
                </span>}

                {/* Delete Task */}
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