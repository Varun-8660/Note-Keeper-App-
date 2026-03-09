import React from 'react'
import './App.css'
import { useState,useEffect } from 'react'
import axios from 'axios';
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [task,setTask] = useState({title:'',completed:false});
const [editId,setEditId] = useState(null);
   const fetchTasks = async () => {
    try {
      const response = await axios.get('https://note-keeper-app-2s6x.onrender.com/api/tasks');
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const addTask = async () => {
    if(task==""){
      alert("Please enter a task title");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/tasks", {title: task, completed: false});
      setTask("");
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }
  
  return (
    <div>
      <h1>Note Keeper For Task</h1>
      <input value={task.title} onChange={(e)=>setTask(e.target.value)} placeholder="Task title"/>
      &nbsp;
      <button onClick={addTask}>ADD-TASK</button>
      {tasks.map((t)=>(
        <div key={t._id}>
          <li key={t.id}>
           <span>{t.title}</span>&nbsp;&nbsp;
           <button >Edit-task</button>&nbsp;&nbsp;
           <button onClick={() => deleteTask(t._id)}>Delete-task</button>
        </li>
        <br />
          </div>
       
      ))}
    </div>
  )
}

export default App