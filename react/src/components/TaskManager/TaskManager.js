import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from '../TaskItem/TaskItem';
import "./TaskManager.css"

const TaskManager = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tasks', {
        headers: { 'token': token },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Fetch tasks error:', error.message);
    }
  };
  useEffect(() => {
    // Fetch tasks when the component mounts or after any operation

    fetchTasks();
  }, [token]); // Include 'token' as a dependency

  const handleCreateTask = async () => {
    try {
      await axios.post(
        'http://localhost:3001/api/tasks',
        { title, description, dueDate },
        { headers: { 'token': token } }
      );
      // After creating a task, re-fetch tasks to update the list
      fetchTasks();
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Create task error:', error.message);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await axios.put(`http://localhost:3001/api/tasks/${updatedTask.taskId}`, updatedTask, {
        headers: { 'token': token },
      });
      // After updating a task, re-fetch tasks to update the list
      fetchTasks();
    } catch (error) {
      console.error('Update task error:', error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${taskId}`, { headers: { 'token': token } });
      // After deleting a task, re-fetch tasks to update the list
      fetchTasks();
    } catch (error) {
      console.error('Delete task error:', error.message);
    }
  };

  return (
    <div className='container_TaskManager'>
      <h2>Task Manager</h2>
      <div className='createTaskcont'>
        <h3>Create Task</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className='create' onClick={handleCreateTask}>Create Task</button>
      </div>
      <div className='taskListCont'>
        <h3>Task List</h3>
        <div className='taskList'>
        {tasks.map((task) => (
            <TaskItem
              key={task.taskId}
              task={task}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
